# mpvue使用模板

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
var authorization = this.userInfo.userId + '_' + this.userInfo.token

wx.request({
  url: api.Logout,
  // data: {openid: getApp().globalData.openId, userNo: this.LoginName, password: this.loginPsw},
  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  header: {
    'Content-Type': 'application/json',
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

```
          wx.showToast({
            title: '该用户不存在',
            icon: 'success',
            image: '../../static/images/fail_login.png',
            duration: 2000
          })
```

