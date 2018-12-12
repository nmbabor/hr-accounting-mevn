import Api from '@/services/Api'
export default {
  allDesignation () {
    return Api().get('designation')
  },
  store (params) {
    return Api().post('designation', params)
  },
  show (params) {
    return Api().get('designation/' + params.id)
  },
  update (params) {
    return Api().put('designation/' + params.id, params)
  },
  destroy (id) {
    return Api().delete('designation/' + id)
  },
  activeDesignations (id) {
    return Api().get('designation/active')
  }
}
