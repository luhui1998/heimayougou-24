import request from "../../utils/request.js"
Page({
  data: {
    hasMore: true,
    keyword: '',
    goods: [],
    getIndex: 0,
    pagenum: 1,
    loading: false
  },
  onLoad: function(options) {
      const {
        keyword
      } = options;
    this.setData({
      keyword
    })

    this.getgoods();

  },
  getgoods() {
    if (this.data.hasMore == false) {
      return
    }
    request({
      url: "/goods/search",
      data: {
        query: this.data.keyword,
        pagenum: this.data.pagenum,
        pagesize: 10
      }
    }).then(res => {
      const {
        message
      } = res.data
      console.log(message)
      const goods = message.goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2);
        return v
      })
      this.setData({
        goods: [...this.data.goods, ...goods],
        loading: true
      })
      if (this.data.goods.length == message.total) {
        hasMore = false
      }
    })
  },
  onReachBottom() {
    if (this.data.loading == true) {

      this.setData({
        pagenum: this.data.pagenum + 1
      })
      this.getgoods();
    }
  },
  handclick(e) {
    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      getIndex: index
    })
  },
  clickinput() {

  }

})