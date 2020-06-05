define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('news/detail_view'),
        data: {
            specHeader: '',
            specTitle:'',
            specContent:'',
            specName:'',
            specTime:'',
            newsid:'',
            newsLink:""
        },
        created: function() {
          this.init();
        },
        filters: {

        },
        methods: {
          init(){
            this.newsid =api.pageParam.newsid;
            Http.ajax({
              data: {
              	"newsId": api.pageParam.newsid,
              },
              url: '/api/news/get',
              isSync: true,
              lock: true,
              success: function(ret) {
                main.specHeader = ret.data.newsTitle;
                main.specContent = ret.data.newsContent;
                main.specTime = ret.data.publishTime;
                main.newsLink = ret.data.newsLink;
              },
              error: function(err) {
              }
            });

          },

          onDetail: function(){
            api.confirm({
                title:'提醒',
                msg:'是否用浏览器',
                button:['确定', '取消']
            },function(ret, err){
                console.log(JSON.stringify(ret));
                
                if(ret.buttonIndex == 1){ return ;}
                if(ret.buttonIndex == 2){ openweb(); return ;}
            })
            // _g.openWin({
            //     name: 'website',
            //     url: 'https://www.baidu.com'
            // });
          },

        }

    });

    var _page = {

    };

    (function() {

    })();

    function openweb(){
      _g.openWin({
          name: 'website',
          url: main.newsLink
      });
    }
    module.exports = {};
});
