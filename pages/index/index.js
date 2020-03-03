import request from "../../utils/request.js"
Page({
  data: {
    banners: [],
    navigation: [],
    cart: [],
    showTop: true
  },
  onLoad() {
    request({
      url: "/home/swiperdata"
    }).then(res => {
      const {
        message
      } = res.data
      console.log(res.data)
      this.setData({
        banners: message
      })
    })

    request({
      url: "/home/catitems"
    }).then(res => {
      const {
        message
      } = res.data
      const newdata = message.map((item, index) => {
        if (index === 0) {
          item.url = "/pages/category/main"
        }
        return item
      })
      this.setData({
        navigation: message
      })
    })

    request({
      url: "/home/floordata"
    }).then(res => {
      const {
        message
      } = res.data
      this.setData({
        cart: message
      })

    })
  },

  handclick: function(e) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  onPageScroll: function(e) {
    const {
      scrollTop
    } = e
    
    let isShow = this.data.showTop
    if (scrollTop > 100) {
      isShow = false
    }
    else {
      isShow= true
    }
    if (this.data.showTop == isShow)
    return
    this.setData({
      showTop : isShow
    })

  }
})