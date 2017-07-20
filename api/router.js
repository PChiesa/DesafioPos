// // Usage:
// const routes = [
//   {
//     name: 'my-page',
//     path: '/',
//     component: Page1
//   },
//   {
//     name: 'my-page-2',
//     path: '/page2/?prop1/something/?prop2',
//     component: Page2
//   }
// ]

// let myRouter = new Router(routes)

// // Push a page to the history. The following lines should do the same thing
// myRouter.push('my-page')
// myRouter.push({
//   name: 'my-page'
// })
// myRouter.push({
//   path: '/'
// })

// // Push a page to the history and update the component props
// myRouter.push({
//   path: '/page2/123/something/456'
// })

// // Replaces the page on the history
// myRouter.replace('my-page')

// // Go to the previous page
// myRouter.go(-1)

// // Go to the next page
// myRouter.go(1)

/**
 * The router manages the routes of an application by using the History api
 * @param {object[]} routes The routes to use
 */
let Router = function (routes) {
    this.routes = routes;

    let regex = new RegExp(/\?(\w+)/g);

    this.routes.forEach((route) => {

        route.params = {};
        route.matchUrl = "";

        let params = route.path.match(regex);

        if (params) {
            let paramPositions = route.path.split("/");

            params.forEach((p) => {
                let paramIndex = paramPositions.indexOf(p);
                route.params[paramIndex] = p;
            });

            paramPositions.forEach((p, index) => {
                if (index > 0) {
                    if (route.params[index])
                        route.matchUrl += "\\/\\w+";
                    else
                        route.matchUrl += `\/${p}`;
                }
            });
        }
        else
            route.matchUrl = route.path;

        route.matchUrl = `^${route.matchUrl}$`;

        console.log(route.matchUrl);
    });
}

/**
 * Initiate the router. It must unmount the pages on the DOM and keep just the active page mounted, according to the current url
 */
Router.prototype.init = function () {

    let url;
    if (new RegExp(/(\#\/?)/).test(location.href))
        url = location.href.split("#")[1] || "/";
    else {
        url = "/";
        location.href += "#";
    }

    this.routes.forEach((route) => {
        let regex = new RegExp(route.matchUrl);
        if (!regex.test(url))
            route.component.unmount();
        else
            this.currentRoute = route;
    });

    let navigation = document.getElementById("navigation");
    navigation.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.nodeName === 'A') {
            let targetUrl = e.target.pathname;
            this.push(targetUrl);
        }
    });
}

/**
 * It unmounts the active page and mounts the correct page, according to the url. It pushes the url to the browser history
 * @param {string} url The url to use
 */
Router.prototype.replace = function (url) {


    history.replaceState()
}

/**
 * It unmounts the active page and mounts the correct page, according to the url. It replaces the url on the browser history
 * @param {string} url The url to use
 */
Router.prototype.push = function (url) {

    let targetRoute;

    if (typeof (url) === "string")
        targetRoute = this.routes.find((route) => route.path === url);
    else
        targetRoute = this.routes.find((route) => route.path === url.path || route.name === url.name);

    if (this.currentRoute.name !== targetRoute.name) {
        this.currentRoute.component.unmount();
        targetRoute.component.mount(document.body);
        history.pushState(targetRoute.name, null, "#" + targetRoute.path);
    }
}

/**
 * Same as history.go
 * @param {number} index The number of pages to go. A positive number will go forward on the history and a negative one will go backwards
 */
Router.prototype.go = function (index) {
    if (index !== 0)
        history.go(index);
}