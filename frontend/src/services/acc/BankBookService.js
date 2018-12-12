import Api from '@/services/Api'

export default {
  index (params) {
    return Api().post('bank-book', params)
  },
  show (id) {
    return Api().get('bank-book/' + id)
  },
  session () {
    return Api().get('bank-book/sessions')
  }
}
