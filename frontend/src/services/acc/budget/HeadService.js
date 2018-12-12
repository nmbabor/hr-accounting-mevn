import Api from '@/services/Api'

export default {
  index () {
    return Api().get('budget-head')
  },

  store (params) {
    return Api().post('budget-head', params)
  },

  update (params) {
    return Api().put('budget-head/' + params._id, params)
  },

  show (params) {
    return Api().get('budget-head/' + params.id)
  },

  delete (id) {
    return Api().delete('budget-head/' + id)
  }
}
