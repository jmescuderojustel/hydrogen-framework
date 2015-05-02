/*exported HydrogenPartialViewsEvents */

var HydrogenPartialViewsEvents = {

    configureEvents: function (partialView, $destination){

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
    }
};