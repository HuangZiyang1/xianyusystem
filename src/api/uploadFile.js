import request from '@/utils/request'

export function upLoadFile(data) {
  return request({
    url: '/common/uploads',
    method: 'post',
    data
  })
}
