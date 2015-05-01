var contactArea = BlogApp.Area('contact',{

    templatePath: 'app/contact/templates',
    templateExtension: 'html'
});

var contactFormPartial = contactArea.Partial(contactArea, 'contactFormPartial', {

    templateName: 'contact-form',
    events: {

        click: {
            'button': function (){

                if (contactFormPartial.isValid()) {

                    BlogApp.navigateToUrl('#contactSent');
                }
                else{

                    alert('Form is not valid!');
                }
            },
            '#email': function (){

                $('#comment').css({ background: '#FFFFFF' });
                $(this).css({ background: '#DEDEDE' });
            },
            '#comment': function (){

                $('#email').css({ background: '#FFFFFF' });
                $(this).css({ background: '#DEDEDE' });
            }
        },
        keyup: {
            '#email': function (){

                $('#numberOfChars').text($('#email').val().length);
            }
        }
    },
    validations: {

        email: '#email',
        required: ['#email', '#comment'],
        checked: '#agreePrivacyConditions'
    }
});

var contactFormSentPartial = contactArea.Partial(contactArea, 'contactFormSentPartial', {

    templateName: 'contact-form-sent'
});

var contactPage = contactArea.Page('contact',[
    { destination: '#main', partial: contactFormPartial },
    { destination: '#menu', partial: menuPartial },
    { destination: '#users-with-post', partial: usersWithPostPartial}
]);

var contactSentPage = contactArea.Page('contact',[
    { destination: '#main', partial: contactFormSentPartial },
    { destination: '#menu', partial: menuPartial },
    { destination: '#users-with-post', partial: usersWithPostPartial}
]);