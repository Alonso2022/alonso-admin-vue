
import request from '@/utils/request'


export function auth(parms) {
   return request({
    url: '/auth',
    method: 'post',
    data:parms
  })
}
