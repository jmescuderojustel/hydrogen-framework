/*global hydrogen */
hydrogen.routes = (function(){

    var routeTable = [],

        templateBasePath = "",

        templateExtension = "";

    var add = function(configuration){

        var newRoute = {};

        if(configuration.url){

            newRoute.url = configuration.url;

        }

        if(configuration.container){

            newRoute.container = configuration.container;

        }

        if(configuration.template){

            newRoute.template = configuration.template;

        }

        if(configuration.data){

            newRoute.data = configuration.data;

        }

        routeTable.push(newRoute);
    };

    var navigateTo = function(url){

        for(var routeCounter = 0; routeCounter < routeTable.length; routeCounter++){

            if(routeTable[routeCounter].url === url){

                if(routeTable[routeCounter].container){

                    var templateUrl = this.templateBasePath + routeTable[routeCounter].template + this.templateExtension,
                        $container = $("#" + routeTable[routeCounter].container),
                        dataSource = routeTable[routeCounter].data;

                    if(routeTable[routeCounter].data){

                        hydrogen.data.proccessDataWithTemplate(dataSource, templateUrl, $container);

                    }
                    else{

                        $("#" + routeTable[routeCounter].container).load(templateUrl);

                    }
                }

                break;
            }
        }
    };

    return {

        add: add,

        navigateTo: navigateTo,

        templateBasePath: templateBasePath,

        templateExtension: templateExtension

    };
})();
