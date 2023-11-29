import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/admin/book/selectBookAll?currentPage=1&&pageSize=5',
    method: 'get',
    // params: query,
    baseURL: 'http://192.168.3.45:8080'
  })
}

export function searchBook(searchBlank) {
  return request({
    url: '/admin/book/searchByTitleAndInfo',
    method: 'get',
    searchBlank
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
