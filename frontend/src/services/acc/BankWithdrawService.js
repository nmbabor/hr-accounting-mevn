import Api from '@/services/Api'
export default {
  index () {
    return Api().get('bank-withdraw')
  },
  session () {
    return Api().get('bank-withdraw/session')
  },
  heads () {
    return Api().get('bank-withdraw/heads')
  },
  store (params) {
    return Api().post('bank-withdraw', params)
  },
  total (id) {
    return Api().get('bank-withdraw/total/' + id)
  },
  update (params) {
    return Api().put('bank-withdraw/' + params._id, params)
  },
  show (params) {
    return Api().post('bank-withdraw/show', params)
  },
  edit (id) {
    return Api().get('bank-withdraw/'+ id)
  },
  destroy (id) {
    return Api().delete('bank-withdraw/' + id)
  }
}
