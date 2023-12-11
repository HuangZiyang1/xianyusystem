import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/notice/selectNoticeAll',
    method: 'get',
    params
  })
}

export function searchBook(searchBlank) {
  return request({
    url: '/admin/notice/searchNoticeAll',
    method: 'get',
    params:{
      searchBlank
    }
  })
}

export function deleteByBookSuitId(noticeId) {
  return request({
    url: '/admin/notice/deleteNotice',
    method: 'post',
    data: {
      noticeId
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
    url: '/admin/notice/insertNotice',
    method: 'post',
    data
  })
}

