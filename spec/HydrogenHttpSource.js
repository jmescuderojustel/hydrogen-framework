/*globals HydrogenApplication:false */

describe('HydrogenHttpSource', function() {
  var context = {
    App : null,
    hydrogenHttpSource: null,
    returned: null,
    done: false,
    setReturned: null
  };

  beforeEach(function() {
    context.App = new HydrogenApplication('App',{
      templatePath: 'app/templates',
      templateExtension: 'html',
      httpSourceBase: 'http://jsonplaceholder.typicode.com'
    });
    context.hydrogenHttpSource = context.App.HttpSource(context.App, 'posts', {
      method: 'GET',
      url: '/posts',
      type: 'http',
      params: null,
      on:{
          after: function(result) {
              return {
                  posts: result
              };
          }
      },
      cache: false
    });
    context.done = false;
    context.setReturned = function(data) {
      context.returned = data;
      context.done = true;
    };
  });

  it('should fetch', function() {
    spyOn(context, 'setReturned');
    var doFetchTests = function() {
      expect(context.done).toBe(true);
      expect(context.setReturned).toHaveBeenCalled();
      expect(context.returned).not.toBeNull();
      expect(Array.isArray( context.returned)).toBe(true);
      expect(context.returned.length > 0).toBe(true);
    };
    var waitFetchToBeDone = function() {
      if(context.done !== true) {
        setTimeout(waitFetchToBeDone, 50);
        return;
      } else {
        doFetchTests();
      }
    };
    waitFetchToBeDone();
    context.hydrogenHttpSource.fetch(context.setReturned);
  });

});