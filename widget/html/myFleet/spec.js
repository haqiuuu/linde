define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('myFleet/spec_view'),
        data: {
            orderList:{
              "Companyname":"PHARMASON CO.,LGD",
              "Model":" E20PH(1275)",
              "TurckNO":" C11275H02791",
              "FleetNO":"N05",
              "Contactperson":"Mr K0 YUN KEI",
              "Tel":"+852-60268650",
              "TruckLocation":" danisohio dsjj cja iosjaij vji ndsa nio nioa nian i nfdia nifdn ifndbau fod",
              "Status":" completed",
              "Remarks":"撒打算大所大所大所大所大所大所大所大所打算打手电暗示打算打算的按单按单暗示打算打打算爱的速递暗示打算打打算sad按单啊打打算打三十多岁啊打算打算按单啊打算打按单暗示打算打算打打算暗示打打打打手电暗示打算打算打是打打算打暗示打算"
            },
            imgList:[
              "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1315256422,3713498384&fm=26&gp=0.jpg","https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1315256422,3713498384&fm=26&gp=0.jpg","https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1315256422,3713498384&fm=26&gp=0.jpg",
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=364676311,205430106&fm=26&gp=0.jpg","https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1315256422,3713498384&fm=26&gp=0.jpg","https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1315256422,3713498384&fm=26&gp=0.jpg",
              "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1315256422,3713498384&fm=26&gp=0.jpg","https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1315256422,3713498384&fm=26&gp=0.jpg","https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1315256422,3713498384&fm=26&gp=0.jpg"
            ],
            orderId:"",
        },
        created: function() {
            this.init();

        },
        filters: {

        },
        methods: {
          init(){
            // this.specHeader = api.pageParam.header;
            this.orderId = api.pageParam.orderId;
            var that = this;
            Http.ajax({
              data: {
                "idempotentId": "",
                "language": "",
                "pageNo": 0,
                "pageSize": 0,
                "roleId": _g.getLS('roleId'),
                "orderId": that.orderId,
                "systemType": "",
                // "taskId": that.search,
                // "userId": _g.getLS('userId')
              },
              url: '/api/list/getOrderDetail',
              isSync: true,
              lock: false,
              success: function(ret) {
                that.orderList=ret.data;
                console.log(ret);
              },
              error: function(err) {
                alert(err)
              }
            });

          },
          onPreviewTap: function (index) {
            var photoBrowser = api.require('photoBrowser');
            var times=0;
            photoBrowser.open({
                images: this.imgList,
                activeIndex:index,
                bgColor: '#000',
            }, function(ret, err) {
                if (ret) {
                  // click:closeImg()
                  // alert(JSON.stringify(ret))
                    console.log(JSON.stringify(ret))
                    var type = JSON.stringify(ret)
                  if (ret.eventType=="click") {
                      closeImg();
                  }
                } else {
                  // alert(2);
                  // alert(JSON.stringify(err));
                }
            });
          },
        }

    });

    var _page = {

    };

    (function() {

    })();
    function closeImg(){
      var photoBrowser = api.require('photoBrowser');
      photoBrowser.close();
    }
    module.exports = {};
});
