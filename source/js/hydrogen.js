/*exported HydrogenApplication */
/*global HydrogenHttpSourceManager, HydrogenLocalSourceManager, HydrogenPartialViewsManager, HydrogenArea, 
    HydrogenPageManager, HydrogenNavigation */

/**
 * This represents an Hydrogen based application.
 *
 * You can have as many as you wish, as you remember that features are not shared among them.
 *
 * @class HydrogenApplication
 * @uses HydrogenArea
 * @constructor
 */
var HydrogenApplication = function(name, configuration){

    this.name = name;
    this.configuration = configuration;

    var
        _areas,
        _navigation;

    // Configure HTTP resource manager
    this._httpSourceManager = new HydrogenHttpSourceManager();
    this.HttpSource = this._httpSourceManager.HttpSource;

    // Configure local resource manager
    this._localSourceManager = new HydrogenLocalSourceManager();
    this.LocalSource = this._localSourceManager.LocalSource;

    // Configure partial views manager
    this._partialViewsManager = new HydrogenPartialViewsManager();
    this.Partial = this._partialViewsManager.Partial;

    // Configure partial views manager
    this._pageManager = new HydrogenPageManager();
    this.Page = this._pageManager.Page;

    // Configure authentication
    //this._authenticationManager = new HydrogenAuthenticationManager();
    //this.Authentication = this._authenticationManager.ensureAuthenticated;

    this.Navigation = function(routes){

        _navigation = new HydrogenNavigation(routes);

        // Subscribe to changes in the hash navigation, so we can navigate
        $(window).on('hashchange', function() {

            _navigation.navigateToUrl(window.location.hash);
        });
    };

    /**
     * Adds an area to the application.
     *
     * Areas allow code to be better organized and easier to maintain.
     *
     * @method Area
     * @param {String} name Name for the area
     * @param {Object} configuration Area's configuration
     * @return {Object} Returns an HydrogenArea object
     */
    this.Area = function(name, configuration){

        var new_area = new HydrogenArea(name, configuration);

        _areas = _areas || [];

        _areas.push(new_area);

        return new_area;
    };
};