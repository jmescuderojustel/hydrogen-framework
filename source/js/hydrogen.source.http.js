/* exported HydrogenHttpSourceManager, HydrogenHttpSource */

var HydrogenHttpSourceTypes = {
    HttpSource : 'http',
    HttpRestFulSource : 'restful'
};

var HydrogenHttpSourceManager = function(){

    var resourceManager = this;

    this._httpSources = [];

    this.HttpSource = function(parent, name, configuration){
        var source;
        if (configuration){
            switch (configuration.sourcetype) {
                case HydrogenHttpSourceTypes.HttpRestFulSource:
                    source = new HydrogenHttpRestFulSource(parent, name, configuration);
                    break;
                default:
                    source = new HydrogenHttpSource(parent, name, configuration);
                    break;
            }
        } else {
            source = new HydrogenHttpSource(parent, name, configuration);
        }

        resourceManager._httpSources.push(source);

        return source;
    };
};

var HydrogenHttpSource = function(parent, name, configuration){

    var httpSource = this;

    this.name = name;
    this.configuration = configuration;
    this.parent = parent;

    this.sourcetype = HydrogenHttpSourceTypes.HttpSource,

    // Configure defaults
    this.configuration = this.configuration || {};
    this.configuration.method = this.configuration.method || 'GET';
    this.configuration.on = this.configuration.on || {};

    this.fetch = function(callback){

        var source = this,
            urlFetch = httpSource.parent.configuration.httpSourceBase + source.configuration.url;

        // If there is a function to apply before fetching data, we execute it here
        if(source.configuration.on.before){

            source.configuration.on.before(source.configuration.params);
        }

        var ajaxCall = $.ajax({
            method: source.configuration.method,
            url: urlFetch,
            data: source.configuration.params
        });

        ajaxCall.done(function(result) {

            // If there is a function to apply after fetching data, we execute it here
            if(source.configuration.on.after){

                // Continue execution
                callback(source.configuration.on.after(result));
            }
            else {

                // Continue execution
                callback(result);
            }
        });

        ajaxCall.error(function(error){

            console.error(error);
        });
    };
};

/**
 * This represents a http restful resource. 
 * A http restful resource is a resource that enables consuming a REST API following CRUD mapping:
 *      Create -> Post
 *      Read   -> Get
 *      Update -> Put
 *      Delete -> Delete
 *
 * You link http restful resources to as many partial views as you wish.
 *
 * @class HydrogenHttpRestFulSource
 * @param {Object} Http restful resource's parent (HydrogenApplication or HydrogenArea)
 * @param {String} name Name for the source
 * @param {Object} configuration Source's configuration
 * @constructor
 */
var HydrogenHttpRestFulSource = function(parent, name, configuration){

    var httpSource = this;

    this.name = name;
    this.configuration = configuration;
    this.parent = parent;

    this.sourcetype = HydrogenHttpSourceTypes.HttpRestFulSource;

    // Configure defaults
    this.configuration = this.configuration || {};

    // Generate each handler
    var generateHandler = function(that,op) {
        if (that.configuration[op])
        {
            that.configuration[op].on   = that.configuration[op].on || {};

            that[op] = function(params, callback) {
                var source = that;
                var urlFetch = httpSource.parent.configuration.httpSourceBase + source.configuration.url;
                var _params = params;
                // If there is a function to apply before fetching data, we execute it here
                if(source.configuration[op].on.before){
                    source.configuration[op].on.before(_params);
                }

                var ajaxCall = $.ajax({
                    method: source.configuration[op].method,
                    url: urlFetch,
                    data: _params
                });

                ajaxCall.done(function(result) {
                    // If there is a function to apply after fetching data, we execute it here
                    if(source.configuration[op].on.after){
                        // Continue execution
                        callback(source.configuration[op].on.after(result));
                    }
                    else {
                        // Continue execution
                        callback(result);
                    }
                });

                ajaxCall.error(function(error){
                    //Error
                    console.error(error);
                });
            };
        } else {
            that.configuration[op] = {};
            that.configuration[op].on = {};
            that[op] = function(params, callback) {
                callback();
            };
        }
    };

    generateHandler(this,'read');
    generateHandler(this,'create');
    generateHandler(this,'update');
    generateHandler(this,'remove');

    // HydrogenPartialView render method uses "fetch" -> redirect to "read" 
    this.fetch = function(callback) {
        this.read(this.configuration.read.params,callback);
    };
};