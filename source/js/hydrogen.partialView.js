/*exported HydrogenPartialView, HydrogenPartialViewsManager, HydrogenPartialViewConfiguration */
/*global Mustache */

/**
 * This represents the manager for partial views
 *
 * @class HydrogenPartialView
 * @constructor
 */
var HydrogenPartialViewsManager = function(){

    var partialViewManager = this;

    this._partialViews = [];

    this.Partial = function(parent, name, configuration){

        var partialView = new HydrogenPartialView(parent, name, configuration);

        partialViewManager._partialViews.push(partialView);

        return partialView;
    };
};

/**
 * This represents a partial view. A partial view is an specific HTML rendered against data retrieved via resources, or
 * just static HTML
 *
 * @class HydrogenPartialView
 * @param {Object} parent Partial view's parent (it can be a HydrogenApplication or a HydrogenArea)
 * @param {String} name Name for the partial
 * @param {HydrogenPartialViewConfiguration} configuration Partial page's configuration
 * @constructor
 */
var HydrogenPartialView = function (parent, name, configuration){

    var partialView = this;

    /**
     * Partial view's name
     *
     * @property name
     * @type String
     */
    this.name = name;

    /**
     * Partial view's configuration
     *
     * @property configuration
     * @type HydrogenPartialViewConfiguration
     */
    this.configuration = configuration;

    /**
     * Parent where this view has been created, whether HydrogenApplication or HydrogenArea
     *
     * @property parent
     * @type HydrogenApplication | HydrogenArea
     */
    this.parent = parent;

    /**
     * Renders this partial view inside an HTML element (or several of them), defined via a jQuery selector
     *
     * @method render
     * @param {String} destinationSelector Selector for the destination HTML element(s)
     */
    this.render = function (destinationSelector){

        var
            basePath = partialView.parent.configuration.templatePath,
            templateName = partialView.configuration.templateName,
            extension = partialView.parent.configuration.templateExtension,
            templateUrl = basePath + '/' + templateName + '.' + extension;

        if (partialView.configuration.source) {

            // In case we have sources for data
            partialView.configuration.source.fetch(function (data) {

                $.ajax({
                    method: 'GET',
                    url: templateUrl,
                    success: function (html) {

                        var innerHtml = Mustache.render(html, data);

                        $(destinationSelector)
                            .html(innerHtml)
                            .promise()
                            .done(function(){

                                partialView.configureEvents($(destinationSelector));
                            });
                    }
                });
            });
        }
        else{

            // No data involved, just render the HTML
            $.ajax({
                method: 'GET',
                url: templateUrl,
                success: function (innerHtml) {

                    $(destinationSelector)
                        .html(innerHtml)
                        .promise()
                        .done(function(){

                            partialView.configureEvents($(destinationSelector));
                        });
                }
            });
        }
    };

    /**
     * Configures all the events that can take place inside the elements owned by an specific element
     *
     * @method configureEvents
     * @param {jQuery} $destination jQuery element that owns the DOM elements that will get events assigned
     */
    this.configureEvents = function ($destination){

        var configuredEvents = partialView.configuration.events;

        if (configuredEvents){

            // If events for this partial are configured
            for (var event in configuredEvents){

                // Iterate all events
                if (configuredEvents.hasOwnProperty(event)) {

                    // Iterate all elements for which I want to configure the event
                    for (var itemAffectedByEvent in configuredEvents[event]) {

                        if (configuredEvents[event].hasOwnProperty(itemAffectedByEvent)) {

                            var
                                $destinationElement = $(itemAffectedByEvent, $destination),
                                functionOnEvent = configuredEvents[event][itemAffectedByEvent];

                            // First, unbind to avoid multiple event assignment
                            $destinationElement.unbind(event).bind(event, functionOnEvent);
                        }
                    }
                }
            }
        }
    };
};

/**
 * This represents the configuration for a partial view
 *
 * @class HydrogenPartialViewConfiguration
 * @constructor
 */
var HydrogenPartialViewConfiguration = function (){

    /**
     * Path where template are located
     *
     * @property templatePath
     * @type String
     * @default ""
     */
    this.templatePath = '';

    /**
     * Template name
     *
     * @property templateName
     * @type String
     * @default ""
     */
    this.templateName = '';

    /**
     * Extension for the template
     *
     * @property templateExtension
     * @type String
     * @default "html"
     */
    this.templateExtension = 'html';

    /**
     * Source for getting data that should be rendered with HTML.
     *
     * @property source
     * @type HydrogenLocalSource | HydrogenLocalSource
     * @default null
     */
    this.source = null;
};