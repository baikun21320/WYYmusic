// pages/login/login.js
import request from "../../utils/request";

/**
 * 登录流程
 *1.收集表单项数据
 *2.前端验证
 *  1）验证用户信息（账号。密码）是否合法
 *  2）验证不通过提示用户不需要发请求
 *  3）验证通过携带（账号，密码）发请求给服务器
 *3.后端验证
 *  1）验证用户是否存在，
 *  2）不存在直接返回用户不存在
 *  3）用户存在验证密码是否正确
 *  4）密码并不正确返回密码错误
 *  5）密码正确返回用户信息
 *
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //表单项内容改变的回调
  handleInput(event) {
    let type = event.currentTarget.id;
    this.setData({
      [type]: event.detail.value
    })
  },
  //登录的回调
  async login(){
    //1、收集表单数据
    let {phone, password} = this.data;
    //2、前端验证
    /*
    * 手机号验证：
    *   1.内容为空
    *   2.手机格式不正确
    *   3.格式正确，验证通过
    *
    * */

    if(!phone) {
      //提示用户
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }
    //自定义正则表达式
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return;
    }
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }

    //后端验证
    let result = await request('/login/cellphone',{phone,password,isLogin: true})
    if(result.code ===200) {
      wx.showToast({
        title: '登录成功'
      })

      //将用户信息储存至本地
      wx.setStorageSync('userInfo',JSON.stringify(result.profile))

      //跳转到个人中心
      wx.reLaunch({
        url: '/pages/personal/personal'
      })
      return;
    }else if(result.code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
      return;
    }else if(result.code === 502) {
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
      return;
    }else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})