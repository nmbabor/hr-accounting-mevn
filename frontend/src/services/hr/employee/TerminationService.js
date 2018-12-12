import Api from '@/services/Api'
export default {
  index () {
    return Api().get('termination')
  },
  session () {
    return Api().get('termination/session')
  },
  regiment () {
    return Api().get('termination/regiment')
  },
  employee (id='') {
    return Api().get('termination/employee/'+id)
  },
  store (params) {
    return Api().post('termination', params)
  },
  update (params) {
    return Api().put('termination/' + params.id, params)
  },
  edit (params) {
    return Api().get('termination/' + params.id)
  },
  destroy (id) {
    return Api().delete('termination/' + id)
  }
}
