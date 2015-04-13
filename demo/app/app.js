var BlogApp = new HydrogenApplication('BlogApp',{

    templatePath: 'app/templates',
    templateExtension: 'html',
    httpSourceBase: 'http://jsonplaceholder.typicode.com'
});

var allUsersSource = BlogApp.HttpSource(BlogApp, 'allUsers', {
    sourcetype:  'restful',
    url: '/users',
    read: { //read
        method: 'GET',
        params: null,
        on: {
            after: function(result) {
                return {
                    users: result
                };
            }
        },
        cache: false
    }
});

var menuSource = BlogApp.LocalSource('menu', {
    options: [
        { name: 'Posts', link: '#'},
        { name: 'Users', link: '#users'}
    ]
});

var menuPartial = BlogApp.Partial(BlogApp, 'menu', {

    templateName: 'menu',
    source: menuSource
});

var usersWithPostPartial = BlogApp.Partial(BlogApp, 'menu', {

    templateName: 'usersWithPosts',
    source: allUsersSource
});

$(function(){
    BlogApp.Navigation([

        { url: '#users', page: usersPage },
        { url: '', page: homePage }
    ]);
});