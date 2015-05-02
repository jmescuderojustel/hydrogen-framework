/*exported _ */

var _ = {

    each: function (array, callback){

        array = array || [];

        for (var counter = 0, total = array.length; counter < total; counter++) {

            callback(array[counter]);
        }
    }
};