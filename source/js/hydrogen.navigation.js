/*exported HydrogenNavigation */

var HydrogenNavigation = function(routes){

    var navigation = this;

    this.routes = routes || [];

    this.navigateTo = function (page){

        page.load();
    };

    this.navigateToUrl = function (url){

        for (var routeCounter = 0, totalRoutes = navigation.routes.length;
             routeCounter < totalRoutes;
             routeCounter++){

            if(navigation.routes[routeCounter].url === url){

                navigation.navigateTo(navigation.routes[routeCounter].page);
            }
        }
    };

    $(function(){

        // By default, navigate to the url that is provided
        navigation.navigateToUrl(window.location.hash);
    });
};