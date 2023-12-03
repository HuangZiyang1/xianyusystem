import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/admin/book/selectBookAll?currentPage=1&&pageSize=5',
    method: 'get',
    // params: query,
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
