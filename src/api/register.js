import request from '@/utils/request'

export function registerUser(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}
