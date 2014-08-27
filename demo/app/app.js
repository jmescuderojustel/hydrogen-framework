var app = (function(){

    var init = function(defaultUrl){

        hydrogen.routes.templateBasePath = "templates/";
        hydrogen.routes.templateExtension = ".html";

        hydrogen.routes.add({
            url: "/",
            update: [{template: "home", container: "content"}]
        }).add({
            url: "/users",
            update: [{template: "users", container: "content", data: app.dataProvider.getUsers}]
        }).add({
            url: "/about",
            update: [{template: "about", container: "content"}]
        });
        hydrogen.routes.navigateTo(defaultUrl);

        hydrogen.forms.on("#btnSubmit", "click", "frmNewUser", function(){alert("OK");}, function(){alert("Error");}, {shouldValidate: true});
    };



    return {

        init: init

    };
})();

app.dataProvider = (function(){

    var getUsers = function(callback){

        callback({users: [
            {id: 0, name: 'John'},
            {id: 1, name: 'Alfred'},
            {id: 2, name: 'Tim'},
            {id: 3, name: 'Susan'},
        ]});

    };

    return {
        getUsers: getUsers
    };
})();

app.init("/");
