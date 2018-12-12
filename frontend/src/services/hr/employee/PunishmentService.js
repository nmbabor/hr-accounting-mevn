import Api from '@/services/Api'
export default {
  index () {
    return Api().get('punishment')
  },
  session () {
    return Api().get('punishment/session')
  },
  employee (id='') {
    return Api().get('punishment/employee/'+id)
  },
  store (params) {
    return Api().post('punishment', params)
  },
  update (params) {
    return Api().put('punishment/' + params.id, params)
  },
  edit (params) {
    return Api().get('punishment/' + params.id)
  },
  destroy (id) {
    return Api().delete('punishment/' + id)
  }
}
