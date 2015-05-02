/*exported HydrogenPartialViewsValidation */
/*global _ */

var HydrogenPartialViewsValidation = {

   configureValidations: function (partialView, $destination){

       var configuredValidations = partialView.configuration.validations;

       if (configuredValidations){

           // If events for this partial are configured
           for (var validation in configuredValidations){

               // Iterate all events
               if (configuredValidations.hasOwnProperty(validation)) {

                   if (Array.isArray(configuredValidations[validation])){

                       // There are many items to be validated with this rule
                       _.each(configuredValidations[validation], function (validationConfiguration){

                           partialView._validations.push({
                               validation: validation,
                               $item: $(validationConfiguration, $destination)
                           });
                       });
                   }
                   else{

                       // There is just on item to validate
                       partialView._validations.push({
                           validation: validation,
                           $item: $(configuredValidations[validation], $destination)
                       });
                   }
               }
           }
       }
   },

   isValid: function (partialView) {

       var isViewValid = true,
           fieldsWithError = [],

           validationFunctions = {

               email: function ($item){

                   var emailRegularExpression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                       isEmailValid = emailRegularExpression.test($item.val());

                   if (!isEmailValid){

                       fieldsWithError.push({ id: $item.prop('id'), error: 'email_validation'} );
                       isViewValid = false;
                   }
               },
               required: function($item){

                   var isItemPresent = ($item.val() !== '');

                   if (!isItemPresent){

                       fieldsWithError.push({ id: $item.prop('id'), error: 'field_required'} );
                       isViewValid = false;
                   }
               },
               checked: function($item){

                   var isChecked = $item.is(':checked');

                   if (!isChecked){

                       fieldsWithError.push({ id: $item.prop('id'), error: 'email_unchecked'} );
                       isViewValid = false;
                   }
               }
           };

       // Iterate all the validations to find out if any is not met
       _.each(partialView._validations, function(validationConfiguration){

           switch (validationConfiguration.validation){

               case 'email':

                   validationFunctions.email(validationConfiguration.$item);
                   break;

               case 'required':

                   validationFunctions.required(validationConfiguration.$item);
                   break;

               case 'checked':

                   validationFunctions.checked(validationConfiguration.$item);
                   break;
           }
       });

       return {

           result: isViewValid,
           fieldsWithError: fieldsWithError
       };
   }
};