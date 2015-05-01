var contactArea = BlogApp.Area('contact',{

    templatePath: 'app/contact/templates',
    templateExtension: 'html'
});

var contactFormPartial = contactArea.Partial(contactArea, 'contactFormPartial', {

    templateName: 'contact-form',
    events:{

        click: {
            'button': function (){

                BlogApp.navigateToUrl('#contactSent');
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