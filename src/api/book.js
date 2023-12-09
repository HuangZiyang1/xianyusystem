import request from '@/utils/request'

export function getAllGoods() {
  return request({
    url: '/admin/book/selectBookAll',
    method: 'get',
    params: {
      currentPage: 1,
      pageSize: 1000000
    }
    // baseURL: 'http://192.168.3.133:8080'
  })
}

export function fetchList(params) {
  return request({
    url: '/admin/book/selectBookAll',
    method: 'get',
    params
    // baseURL: 'http://192.168.3.133:8080'
  })
}

export function searchBook(searchBlank) {
  return request({
    url: '/admin/book/searchByTitleAndInfo',
    method: 'get',
    params:{
      searchBlank
    }
  })
}

export function deleteByBookSuitId(suitId) {
  return request({
    url: '/admin/book/deleteByBookSuitId',
    method: 'post',
    data: {
      suitId
    }
  })
}

export function topBook(suitId) {
  return request({
    url: '/admin/book/topBook',
    method: 'post',
    data: {
      suitId
    }
  })
}

export function cancelTopBook(suitId) {
  return request({
    url: '/admin/book/cancelTopBook',
    method: 'post',
    data: {
      suitId
    }
  })
}

// uploadBooks
export function uploadBooks(data) {
  return request({
    url: '/admin/book/insertBookSuit',
    method: 'post',
    data
  })
}
