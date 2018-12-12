import Api from '@/services/Api'
export default {
  index () {
    return Api().get('transfer')
  },
  session () {
    return Api().get('transfer/session')
  },
  regiment () {
    return Api().get('transfer/regiment')
  },
  employee (id='') {
    return Api().get('transfer/employee/'+id)
  },
  store (params) {
    return Api().post('transfer', params)
  },
  update (params) {
    return Api().put('transfer/' + params.id, params)
  },
  edit (params) {
    return Api().get('transfer/' + params.id)
  },
  destroy (id) {
    return Api().delete('transfer/' + id)
  }
}
