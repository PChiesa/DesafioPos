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

        route.matchUrl = "";

        let params = route.path.match(paramsRegex);

        if (params) {

            route.params = {};
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

        let activeNavigation = navigation.getElementsByClassName("active")[0];
        activeNavigation.className = null;

        let link = e.target.closest("a");

        let newActiveNavigation = e.target.closest("li");
        newActiveNavigation.className = "active";

        this.push(link.pathname);
    });

    window.addEventListener("hashchange", (event) => {
        let currentUrl = location.hash.replace("#", "");
        let currentRoute = this.getRouteByUrl(currentUrl);

        let activeNavigation = navigation.getElementsByClassName("active")[0];
        activeNavigation.className = null;

        let links = navigation.querySelectorAll("a");

        for (let index = 0; index < links.length; index++) {
            let a = links[index];
            let regx = new RegExp(currentRoute.matchUrl);
            if (regx.test(a.pathname)) {
                let newActiveNavigation = a.closest("li");
                newActiveNavigation.className = "active";
                break;
            }
        }
    });

    window.addEventListener("popstate", (event) => {

        let currentUrl = location.hash.replace("#", "");

        targetRoute = this.getRouteByUrl(currentUrl);

        let props = {};

        if (this.routeHasParams(targetRoute))
            props = this.extractParamsFromUrl(targetRoute, currentUrl);

        if (this.currentRoute.name !== targetRoute.name) {
            this.currentRoute.component.unmount();
            targetRoute.component.mount(document.body);
        }

        targetRoute.component.create(props);

        this.currentRoute = targetRoute;
    });
}

/**
 * It unmounts the active page and mounts the correct page, according to the url. It pushes the url to the browser history
 * @param {string} url The url to use
 */
Router.prototype.replace = function (url) {
    history.replaceState(null, null, "#" + url);
}

/**
 * It unmounts the active page and mounts the correct page, according to the url. It replaces the url on the browser history
 * @param {string} url The url to use
 */
Router.prototype.push = function (url) {

    let targetRoute;

    if (typeof (url) === "string")
        targetRoute = this.getRouteByUrl(url);
    else
        targetRoute = this.getRouteByPathOrName(url);

    let props = {};

    if (this.routeHasParams(targetRoute))
        props = this.extractParamsFromUrl(targetRoute, url);

    pushStateIfNotSameRoute.call(this, url, props);


    /**
     * Push the state to the history if the target route is different than the current route     
     * @param {string} urlToBePushed The url that will be pushed to the navigation bar
     * @param {object} urlParams The parameters inside the url
     */
    function pushStateIfNotSameRoute(urlToBePushed, urlParams) {

        if (this.currentRoute)
            if (this.currentRoute.name !== targetRoute.name) {
                this.currentRoute.component.unmount();
                targetRoute.component.mount(document.body);
            }
            else
                return;

        targetRoute.component.create(urlParams);
        history.pushState({ name: targetRoute.name }, null, "#" + urlToBePushed);
        this.currentRoute = targetRoute;
    }
}

/**
 * Same as history.go
 * @param {number} index The number of pages to go. A positive number will go forward on the history and a negative one will go backwards
 */
Router.prototype.go = function (index) {
    if (index)
        history.go(index);
}

/**
 * Get a route based on a url
 * @param {string} url Url to be matched with one of the routes
 * @returns {object} Route match or index route if no route is found
 */
Router.prototype.getRouteByUrl = function (url) {

    let foundRoute = this.routes.find((route) => {
        return new RegExp(route.matchUrl).test(url);
    });

    if (foundRoute)
        return foundRoute;

    let rootRoute = this.getRootRoute();
    this.replace(rootRoute.path);
    return rootRoute;
}

/**
 * Get a route based on a path or a name
 * @param {object} routeObj The object with the name or path
 * @return {object} Route match or index route if no route is found
 */
Router.prototype.getRouteByPathOrName = function (routeObj) {

    let foundRoute = this.routes.find((route) => {
        return route.name === routeObj.name || new RegExp(route.matchUrl).test(routeObj.path)
    });

    if (foundRoute)
        return foundRoute;

    let rootRoute = this.getRootRoute();
    this.replace(rootRoute.path);
    return rootRoute;
}

/**
 * Gets the route with the path "/"
 * @returns {object} The root route
 */
Router.prototype.getRootRoute = function () {
    return this.routes.find((route) => route.path === "/");
}

/**
 * Checks if a route has parameters in its url
 * @param {object} route Route to be checked
 * @returns {boolean}
 */
Router.prototype.routeHasParams = function (route) {
    return Boolean(route.params);
}

/**
 * Extract the parameters from the currentUrl
 * @param {object} route Route with params
 * @param {string} currentUrl Url with parameters to be extracted
 * @returns {object} Object with the parameters
 */
Router.prototype.extractParamsFromUrl = function (route, currentUrl) {
    let props = {};
    let urlParams = currentUrl.split("/");
    let routeParams = Object.keys(route.params);

    routeParams.forEach((param, index) => {
        let propName = route.params[routeParams[index]].replace("?", "");
        props[propName] = urlParams[param];
    });

    return props;
}