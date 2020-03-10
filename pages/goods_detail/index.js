import request from "../../utils/request.js"
Page({

  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    detail: [],
    tab: 0,
    current: [], // 当前显示图片的http链接
    urls: [],
    goods: []

  },
  onLoad: function(options) {
    console.log(options)
    request({
      url: "/goods/detail",
      data: {
        goods_id: options.id
      }
    }).then(res => {
      console.log(res.data)
      const {
        message
      } = res.data;
      const pics = message.pics.map(v => {
        return v.pics_big
      })
      this.setData({
        detail: message,
        urls: pics

      })
    })
  },

  handclicktab(e) {

    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      tab: index
    })
  },
  handclickimage(e) {
    const {
      index
    } = e.currentTarget.dataset
    wx.previewImage({
      current: this.data.urls[index], // 当前显示图片的http链接
      urls: this.data.urls // 需要预览的图片http链接列表
    })
  },
  handsechitab(e) {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },
  handshopping() {
    const goods = wx.getStorageSync("goods") || []
    const exit = goods.some(v => {
      if (this.data.detail.goods_id === v.goods_id) {
        v.number += 1
        wx.showToast({
          title: '商品+1',
          icon: 'success',
          duration: 2000
        })
      }
      return this.data.detail.goods_id === v.goods_id
    })

    if (exit == false) {
      goods.unshift({
        goods_id: this.data.detail.goods_id,
        goods_name: this.data.detail.goods_name,
        goods_price: this.data.detail.goods_price,
        goods_small_logo: this.data.detail.goods_small_logo,
        number: 1,
        selete:true
      })
    }
    console.log(exit)

    wx.setStorageSync("goods", goods)
  }
})