import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/admin/indexImg/getAllIndexImg',
    method: 'get',
  })
}


export function deleteByBookimgId(imgId) {
  return request({
    url: '/admin/indexImg/deleteIndexImg',
    method: 'get',
    params: {
      imgId
    }
  })
}

export function updateAd(data) {
  return request({
    url: '/admin/indexImg/updateIndexImg',
    method: 'post',
    data
  })
}

export function uploadAd(data) {
  return request({
    url: '/admin/indexImg/insertIndexImg',
    method: 'post',
    data
  })
}

export function uploadPic(file) {
  return request({
    url: '/common/uploads',
    method: 'post',
    data: {
      file
    }
  })
}

