import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/admin/freeBusiness/selectFreeBusinessesAll?currentPage=1&&pageSize=5',
    method: 'get',
  })
}

export function searchBook(searchBlank) {
  return request({
    url: '/admin/freeBusiness/searchFreeBusinessesAll',
    method: 'get',
    params:{
      searchBlank
    }
  })
}

export function deleteByBookSuitId(businessId) {
  return request({
    url: '/admin/freeBusiness/deleteFreeBusiness',
    method: 'post',
    data: {
      businessId
    }
  })
}

export function topBook(businessId) {
  return request({
    url: '/admin/freeBusiness/topFreeBusinesses',
    method: 'post',
    data: {
      businessId
    }
  })
}

export function cancelTopBook(businessId) {
  return request({
    url: '/admin/freeBusiness/cancelTopFreeBusinesses',
    method: 'post',
    data: {
      businessId
    }
  })
}

export function uploadIdle(data) {
  return request({
    url: '/admin/freeBusiness/insertFreeBusinesses',
    method: 'post',
    data
  })
}
