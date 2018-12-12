import Api from '@/services/Api'

export default {
  index () {
    return Api().get('districts')
  },

  store (params) {
    return Api().post('districts', params)
  },

  update (params) {
    return Api().put('districts/' + params._id, params)
  },

  show (params) {
    return Api().get('districts/' + params.id)
  },

  delete (id) {
    return Api().delete('districts/' + id)
  },
  activeDistricts () {
    return Api().get('districts/active')
  }
}
