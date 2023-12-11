import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    // data:{
    //   username: 'admin',
    //   password: 'admin123'
    // }
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/getInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getAdminInfo() {
  return request({
    url: '/admin/user/getAdminInfo',
    method: 'get'
  })
}

export function postPhoneAPI(phone) {
  return request({
    url: '/admin/user/updateAdmin',
    method: 'post',
    data: {
      userId: '1',
      phone
    }
  })
}
