define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('notification/spec_view'),
        data: {
            specHeader: '',
            specTitle:'',
            specContent:'',
            specName:'',
            specTime:''
        },
        created: function() {
            this.init();
        },
        filters: {

        },
        methods: {
          init(){
            this.specHeader = api.pageParam.header;
            this.specTitle = api.pageParam.title;
            this.specContent = api.pageParam.content;
            this.specName = api.pageParam.name;
            this.specTime = api.pageParam.time;
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(api.pageParam.header);
            console.log(this.specHeader);
          }
        }

    });

    var _page = {

    };

    (function() {

    })();
    module.exports = {};
});
