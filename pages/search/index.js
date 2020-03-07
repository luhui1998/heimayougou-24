import request from "../../utils/request.js"
Page({
  data: {
    loading: '',
    loadingvalue: '',
    recommend: [],
    list: false,
  },
  onLoad: function(options) {

  },
  handinput(e) {
    const {
      value
    } = e.detail
    this.setData({
      loading: value
    })
    if (!value) {
      this.setData({
        recommend: []
      })
      return
    }
    this.getrecommend()
  },
  handclicknone() {
    this.setData({
      loading: '',
      recommend: []
    })
  },
  getrecommend() {
    if (this.data.list === false) {
      this.setData({
        list: true,
        loadingvalue: this.data.loading
      })
      request({
        url: '/goods/qsearch',
        data: {
          query: this.data.loading
        }
      }).then(res => {
        const {
          message
        } = res.data
        this.setData({
          recommend: message,
          list: false
        })
        if (this.data.loadingvalue !== this.data.loading) {
          this.getrecommend()
        }
      })

    }
  },
  handleShowList(e) {
    console.log(e.target.dataset)
    const {id} = e.target.dataset
    if (!id) {
      this.setData({
        recommend: []
      })
    }
  }
})