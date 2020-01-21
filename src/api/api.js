import http from '../http'

class Api {
  /**
   * 获取题目列表
   */
  static async answerData (page, pageSize) {
    const res = await http.post('/question/list', {
      page: page,
      pageSize: pageSize
    })
    return res
  }
  /**
   * 提交答题情况
   */
  static async comfrimAnswer (obj) {
    const res = await http.post('/answer/add', obj)
    return res
  }

  /**
   * 提交答题情况
   */
  static async rankingData (page, pageSize) {
    const res = await http.post('/user/leaderboard', {
      page: page,
      pageSize: pageSize
    })
    return res
  }

  /**
   * 微信授权登录，返回登录token
   */
  static async loginData (code) {
    const res = await http.post('/wxAuth/token', {
      code: code
    })
    return res
  }

  /**
   * 获取登录token
   */
  static async loginToken () {
    localStorage.removeItem('token')
    const userId = localStorage.getItem('userId')
    const res = await http.post('/wxAuth/login', {
      userId: userId
    })
    if (res.data.message === '参数错误') {
      return false
    }
    const token = JSON.parse(res.data.data).token
    localStorage.setItem('token', token)
    return true
  }

  /**
   * 获取用户信息
   */
  static async userData (userId) {
    const res = await http.post('/user/generalInfo', {
      userId: userId
    })
    return res
  }

  /**
   * 获取段位信息
   */
  static async duanData (page, pageSize) {
    const res = await http.post('/rank/list', {
      page: page,
      pageSize: pageSize
    })
    return res
  }
}

export default Api
