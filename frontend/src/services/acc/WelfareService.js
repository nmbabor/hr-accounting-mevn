import Api from '@/services/Api'
export default {
  index () {
    return Api().get('welfare')
  },
  session () {
    return Api().get('welfare/session')
  },
  store (params) {
    return Api().post('welfare', params)
  },
  update (params) {
    return Api().put('welfare/' + params.id, params)
  },
  edit (params) {
    return Api().get('welfare/' + params.id)
  },
  destroy (id) {
    return Api().delete('welfare/' + id)
  }
}
