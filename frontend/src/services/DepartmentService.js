import Api from '@/services/Api'

export default {
  index () {
    return Api().get('departments')
  },

  store (params) {
    return Api().post('departments', params)
  },

  update (params) {
    return Api().put('departments/' + params._id, params)
  },

  show (params) {
    return Api().get('departments/' + params.id)
  },

  delete (id) {
    return Api().delete('departments/' + id)
  },
  activeDepartments () {
    return Api().get('departments/active')
  }
}
