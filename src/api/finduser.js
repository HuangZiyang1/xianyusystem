import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/user/getAllUsers',
    method: 'get',
    params
  })
}

export function searchBook(searchBlank) {
  return request({
    url: '/admin/user/searchUserByNickName',
    method: 'get',
    params:{
      searchBlank
    }
  })
}

export function deleteByBookSuitId(userId) {
  return request({
    url: '/admin/user/updateUserStatus',
    method: 'post',
    data: {
      userId
    }
  })
}

export function topBook(serviceId) {
  return request({
    url: '/admin/service/topService',
    method: 'post',
    data: {
      serviceId
    }
  })
}

export function cancelTopBook(serviceId) {
  return request({
    url: '/admin/service/cancelTopService',
    method: 'post',
    data: {
      serviceId
    }
  })
}
