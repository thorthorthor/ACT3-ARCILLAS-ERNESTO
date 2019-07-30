//Services
var JOKE_SERVICE = {
    get: function(){
            return $.ajax({
                type: 'get',
                url: JOKES_API
            });
        },
    answer: function(){
            return $.ajax({
                type: 'get',
                url: YN_API
            });
        }
}




