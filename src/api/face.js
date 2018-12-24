import request from '@/utils/request'

export function detect(data) {
  return request({
    url: '/face/detect',
    method: 'post',
    data
  })
}

export function beautify(data) {
  return request({
    url: '/face/beautify',
    method: 'post',
    data
  })
}

export function compare(data) {
  return request({
    url: '/face/compare',
    method: 'post',
    data
  })
}
