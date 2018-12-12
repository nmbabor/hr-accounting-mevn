import Api from '@/services/Api'
export default {
  index () {
    return Api().get('performance')
  },
  session () {
    return Api().get('performance/session')
  },
  employee (id='') {
    return Api().get('performance/employee/'+id)
  },
  store (params) {
    return Api().post('performance', params)
  },
  update (params) {
    return Api().put('performance/' + params.id, params)
  },
  edit (params) {
    return Api().get('performance/' + params.id)
  },
  destroy (id) {
    return Api().delete('performance/' + id)
  }
}
