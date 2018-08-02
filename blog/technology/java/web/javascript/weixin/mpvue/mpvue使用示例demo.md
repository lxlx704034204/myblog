# mpvue使用示例demo

## 操作全局变量

```
getApp().globalData.isPages = 0
```

## 缓存操作:

```
 this.userInfo = wx.getStorageSync('userInfo')
```

## 请求:

```js
import * as api from '@/utils/api'
var that = this
var userInfo = getApp().globalData.userInfo
var authorization = userInfo.userId + '_' + userInfo.token
wx.request({
  url: api.Logout,
  // data: {openid: getApp().globalData.openId, userNo: this.LoginName, password: this.loginPsw},
  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  header: {
    'Content-Type': 'application/json',//application/x-www-form-urlencoded
    'authorization': authorization
  },
  success: res => {
      if (res.data.code === '200') {
          getApp().globalData.isLogin = false
    	  that.isLogin = false
      }    
  }
})
```

## 提示

```js
          wx.showToast({
            title: '该用户不存在',
            icon: 'success',
            image: '../../static/images/fail_login.png',
            duration: 2000
          })
          
          //不显示图标，此时 title 文本最多可显示两行
          wx.showToast({
            title: '商品数量不能为字母',
            duration: 2000,
            icon: 'none'
          })
```

