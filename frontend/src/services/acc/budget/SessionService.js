import Api from '@/services/Api'

export default {
  index () {
    return Api().get('budget-session')
  },

  store (params) {
    return Api().post('budget-session', params)
  },

  update (params) {
    return Api().put('budget-session/' + params._id, params)
  },

  active (id) {
    return Api().get('budget-session/active/' + id)
  },
  show (params) {
    return Api().get('budget-session/' + params.id)
  },

  delete (id) {
    return Api().delete('budget-session/' + id)
  },
  activeData () {
    return Api().get('budget-session/active')
  }
}
