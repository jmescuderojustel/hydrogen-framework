/*globals HydrogenApplication:false */

describe('HydrogenHttpRestFulSource', function() {
  var context = {
    App : null,
    hydrogenHttpRestFulSource: null,
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
    context.hydrogenHttpRestFulSource = context.App.HttpSource(context.App, 'posts', {
        sourcetype:  'restful',
        url: '/posts',
        read: { //read
            method: 'GET'
        },
        create: { //create
            method: 'POST'
        },
        update: { //update
            method: 'PUT'
        },
        remove: { //delete
            method: 'DELETE'
        }
    });
    context.returned = null;
    context.done = false;
    context.setReturned = function(data) {
      context.returned = data;
      context.done = true;
    };
  });

  it('should read', function() {
    spyOn(context, 'setReturned');
    var doReadTests = function() {
      expect(context.done).toBe(true);
      expect(context.setReturned).toHaveBeenCalled();
      expect(context.returned).not.toBeNull();
      expect(Array.isArray( context.returned)).toBe(true);
      expect(context.returned.length > 0).toBe(true);
    };
    var waitReadToBeDone = function() {
      if(context.done !== true) {
        setTimeout(waitReadToBeDone, 50);
        return;
      } else {
        doReadTests();
      }
    };
    waitReadToBeDone();
    context.hydrogenHttpRestFulSource.read(null,context.setReturned);
  });

  it('should create', function () {
    var data = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };
    spyOn(context, 'setReturned');
    var doCreateTests = function() {
      expect(context.setReturned).toHaveBeenCalled();
      expect(context.returned).not.toBeNull();
      expect(context.returned).toBeDefined();
      expect(context.returned.id).toBeDefined();
      expect(context.returned.id).not.toBeNull();
      expect(context.returned.title).toBe(data.title);
      expect(context.returned.body).toBe(data.body);
      expect(context.returned.userId).toBe(data.userId);
    };
    var waitCreateToBeDone = function() {
      if(context.done !== true) {
          setTimeout(waitCreateToBeDone, 50);
          return;
      } else {
        doCreateTests();
      }
    };
    waitCreateToBeDone();
    context.hydrogenHttpRestFulSource.create(data,context.setReturned);
  });

  it('should update', function () {
    var data = {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1
    };
    spyOn(context, 'setReturned');
    var doUpdateTests = function() {
      expect(context.setReturned).toHaveBeenCalled();
      expect(context.returned).not.toBeNull();
      expect(context.returned).toBeDefined();
      expect(context.returned.id).toBe(data.id);
      expect(context.returned.title).toBe(data.title);
      expect(context.returned.body).toBe(data.body);
      expect(context.returned.userId).toBe(data.userId);
    };
    var waitUpdateToBeDone = function() {
      if(context.done !== true) {
          setTimeout(waitUpdateToBeDone, 50);
          return;
      } else {
        doUpdateTests();
      }
    };
    waitUpdateToBeDone();
    context.hydrogenHttpRestFulSource.update(data,context.setReturned);
  });

  it('should remove', function () {
    var data = {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1
    };
    spyOn(context, 'setReturned');
    var doRemoveTests = function() {
      //expect(context.setReturned).toHaveBeenCalled();
      //expect(context.returned).not.toBeNull();
      //expect(context.returned).toBeDefined();
    };
    var waitRemoveToBeDone = function() {
      if(context.done) {
        setTimeout(waitRemoveToBeDone, 50);
        return;
      } else {
        doRemoveTests();
      }
    };
    waitRemoveToBeDone();

    context.hydrogenHttpRestFulSource.remove(data,context.setReturned);
  });

});