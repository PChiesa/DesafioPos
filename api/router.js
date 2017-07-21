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

    let paramsRegex = new RegExp(/\?(\w+)/g);

    this.routes.forEach((route) => {

        route.params = {};
        route.matchUrl = "";

        let params = route.path.match(paramsRegex);

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

    this.currentRoute;

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
    });

    this.push(url);

    let navigation = document.getElementById("navigation");
    navigation.addEventListener("click", (e) => {
        e.preventDefault();

        let link;

        if (e.target.nodeName === 'A')
            link = e.target;
        else if (e.target.parentNode.nodeName === 'A')
            link = e.target.parentNode;

        this.push(link.pathname);
    });

    window.addEventListener("popstate", (event) => {
        if (!event) return;
        if (!event.state) return;

        this.currentRoute.component.unmount();
        let targetRoute = this.routes.find((route) => route.name === event.state.name);
        targetRoute.component.mount(document.body);
        this.currentRoute = targetRoute;
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
    let props = {};

    if (typeof (url) === "string") {
        targetRoute = this.routes.find((route) => {
            let regex = new RegExp(route.matchUrl);
            return regex.test(url);
        });

        let paramsOrder = Object.keys(targetRoute.params);

        if (paramsOrder.length) {
            let urlProps = url.split("/");
            paramsOrder.forEach((param, index) => {
                let propName = targetRoute.params[paramsOrder[index]].replace("?", "");
                props[propName] = urlProps[param];
            });
        }

        pushStateIfNotSameRoute.call(this, url);
    }
    else {
        targetRoute = this.routes.find((route) => {
            let regex = new RegExp(route.matchUrl);
            return regex.test(url.path) || regex.test(url.name);
        });

        pushStateIfNotSameRoute.call(this, targetRoute.path);
    }

    /**
     * Push the state to the history if the target route is different than the current route     
     * @param {string} urlToBePushed The url that will be pushed to the navigation bar
     */
    function pushStateIfNotSameRoute(urlToBePushed) {
        if (!this.currentRoute) {
            targetRoute.component.create(props);
            history.pushState({ name: targetRoute.name }, null, "#" + urlToBePushed);
            this.currentRoute = targetRoute;            
        }
        else if (this.currentRoute.name !== targetRoute.name) {
            this.currentRoute.component.unmount();

            targetRoute.component.mount(document.body);
            targetRoute.component.create(props);

            this.currentRoute = targetRoute;
            history.pushState({ name: targetRoute.name }, null, "#" + urlToBePushed);
        }
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