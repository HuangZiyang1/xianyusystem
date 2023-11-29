import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/admin/user/getAllUsers?currentPage=1&&pageSize=5',
    method: 'get',
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
