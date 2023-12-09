import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/service/selectServiceAll',
    method: 'get',
    params
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

export function uploadService(data) {
  return request({
    url: '/admin/service/insertService',
    method: 'post',
    data: {
      serviceName: data.serviceName,
      isOnTop: data.isOnTop,
      userId: 1,
      highPrice: data.highPrice,
      lowPrice: data.lowPrice,
      title: data.title,
      info: data.info,
      urlList: [],
      contact: ''
    }
  })
}

