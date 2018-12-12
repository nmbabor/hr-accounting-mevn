import Api from '@/services/Api'
export default {
  index () {
    return Api().get('expenditure')
  },
  session () {
    return Api().get('expenditure/session')
  },
  heads () {
    return Api().get('expenditure/heads')
  },
  store (params) {
    return Api().post('expenditure', params)
  },
  info (params) {
    return Api().post('expenditure/info', params)
  },
  update (params) {
    return Api().put('expenditure/' + params._id, params)
  },
  show (params) {
    return Api().post('expenditure/show', params)
  },
  edit (id) {
    return Api().get('expenditure/'+ id)
  },
  destroy (id) {
    return Api().delete('expenditure/' + id)
  }
}
