import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/admin/service/selectServiceAll?currentPage=1&&pageSize=5',
    method: 'get',
  })
}

export function searchBook(searchBlank) {
  return request({
    url: '/admin/service/searchFreeBusinessesAll',
    method: 'get',
    params:{
      searchBlank
    }
  })
}

export function deleteByBookSuitId(serviceId) {
  return request({
    url: '/admin/service/deleteServiceById',
    method: 'post',
    data: {
      serviceId
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
