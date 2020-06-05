define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var UserType = _g.getLS('UserType') || '8';
    var UserId = _g.getLS('userId');
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('notification/notification_view'),
        data:{
            notificationList:[],
        },
        computed:{
          getList(){
            return this.notificationList;
          }
        },

        created: function() {
          this.init();
          console.log("crrrrrrrrrrrrrrreeeeeeeeeeeeaaaaaaaaaaaaaaaatttttttttttteeeeeeeeeee");
          console.log(this.notificationList);
          // console.log(this.getList);
        },
        filters: {

        },
        methods: {
          //打开详情
          onDetailTap: function(item){
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            var systemDate = year + seperator1 + month + seperator1 + strDate;
            Http.ajax({
              data: {
                "accountId":UserId,
                "createTime": item.createTime,
              	"ifRead": 1,
              	"listId": item.listId,
              	"pushId": item.pushId,
              	"readTime": systemDate,
              	"taskContent": item.taskContent,
              	"taskTitle": item.taskTitle
              },
              url: '/api/task/list/update',
              isSync: true,
              lock: true,
              success: function(ret) {
                main.init();
              },
              error: function(err) {
              }
            });

            _g.openWin({
                header: {
                    title: 'notification'
                },
                bounces: true,
                slidBackEnabled: false,
                name: 'notification-spec',
                url: '../notification/spec_frame.html',
                pageParam: {
                  //传递参数
                  header:'Detail Of The Note',
                  title:"Dear "+item.taskTitle +",",
                  content:item.taskContent,
                  name:"linted",
                  time:item.createTime.slice(0,10),

                }
            })
          },
          init(){
            var that = this;
            Http.ajax({
              data: {
                "accountId":UserId,
              	"idempotentId": "",
              	"language": "",
              	"listId": "",
              	"listListId": [],
              	"pageNo": 0,
              	"pageSize": 0,
              	"systemType": ""
              },
              url: '/api/task/list/list',
              isSync: true,
              lock: true,
              success: function(ret) {
                main.notificationList=ret.data.list;

              },
              error: function(err) {
                alert("获取列表失败")
                console.log(JSON.stringify(err))
              }
            });

          }
        }

    });

    var _page = {

    };

    (function() {

    })();
    module.exports = {};
});
