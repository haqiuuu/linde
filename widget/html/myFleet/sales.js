define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('myFleet/sales_view'),
        data: {
            type:"Truck S/N",
            isSlide: false,
            isTriangle: false,
            toggleClassId: 0,
            istoggle:false,
            search:'',
            companySearch:"",
            LANGUAGE: LANGUAGE,
            businessList: [
                "PHARMASON CO.,LGD1","PHARMASON CO.,LGD2","PHARMASON CO.,LGD3"
            ],
            itemTitle: [
                {
                    title: LANGUAGE.myfleet_sales_truckTitle,
                    // type: 0,
                },
                {
                    title: LANGUAGE.myfleet_sales_companyTitle,
                    // type: 0,
                },
            ],
            menuList :[
                {
                    name:LANGUAGE.myfleet_sales_truckMenu,
                    type: true,
                },
                {
                    name:LANGUAGE.myfleet_sales_companyMenu,
                    type: false,
                }
            ],
            activeIndex: 0,
            truckList:[
              {
                sn:"C11275H02791",
                model:"E20PH(1275)"
              },
              {
                sn:"C11275H02792",
                model:"E20PH(1275)"
              },
              {
                sn:"C11275H02793",
                model:"E20PH(1275)"
              },
            ]

        },
        mounted: function() {
          this.init();
        },
        filters: {

        },
        methods: {
            // 点击下拉展示事件
            onToggleTap: function() {
                main.isSlide = !main.isSlide;
                main.isTriangle = !main.isTriangle;
            },
            // 点击下拉菜单选择切换事件
            onToggleChange:function(item) {
                if(item==1){
                  this.type="Company name";
                  main.isSlide = !main.isSlide;
                  main.isTriangle = !main.isTriangle;
                }else{
                  this.type="Truck S/N"
                  main.isSlide = !main.isSlide;
                  main.isTriangle = !main.isTriangle;
                }
            },
            // onToggleMenuTap: function(index) {
            //     var item = main.itemsList[index];
            //     main.activeIndex = index;

            // },

            onDetailTap: function(item) {
                _g.openWin({
                    header: {
                        title: 'Truck Detail'
                    },

                    name: 'truck-detail',
                    url: '../myFleet/business_frame.html',
                    pageParam:{
                      businessName:item,
                      // businessList:["C11275H02791","C11275H02792","C11275H02793"]
                    }
                })
            },
            onCheckTap: function(item){
              _g.openWin({
                  header: {
                      title: 'detail'
                  },
                  bounces: true,
                  slidBackEnabled: false,
                  name: 'myfleet-detail',
                  url: '../myFleet/detail_frame.html',
                  pageParam: {
                    //传递参数
                    sn:item,
                  }
              })
            },
            onSearch: function(){
              if(this.type!='Truck S/N'){
                this.companySearch=this.search;
                this.search= '';
                this.init();
                this.search=this.companySearch;
              }else{
                this.companySearch='';
                this.init();
              }

            },
            init(){
              var that = this;
              Http.ajax({
                  data: {
                    "customer": that.companySearch,
                  	"idempotentId": "",
                  	"language": "",
                  	"listTruckId": [],
                  	"pageNo": 0,
                  	"pageSize": 0,
                  	"systemType": "",
                  	"truckId": ""
                  },
                  url: '/api/truckexcel/getcustomer',
                  isSync: false,
                  lock: false,
                  success: function(ret) {
                      that.businessList = ret.data.list;
                  },
                  error: function(err) {
                    alert(err)
                  }
                });

                Http.ajax({
                    data: {
                      "customer": "",
                    	"idempotentId": "",
                    	"language": "",
                    	"listTruckId": [],
                    	"pageNo": 0,
                    	"pageSize": 0,
                    	"systemType": "",
                    	"truckId": that.search
                    },
                    url: '/api/truckexcel/getTruckSn',
                    isSync: false,
                    lock: false,
                    success: function(ret) {
                      that.truckList = ret.data.list;

                    },
                    error: function(err) {
                      alert(err)
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
