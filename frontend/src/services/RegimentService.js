import Api from '@/services/Api'

export default {
  index () {
    return Api().get('regiments')
  },

  store (params) {
    return Api().post('regiments', params)
  },

  update (params) {
    return Api().put('regiments/' + params._id, params)
  },

  show (params) {
    return Api().get('regiments/' + params.id)
  },

  delete (id) {
    return Api().delete('regiments/' + id)
  },

  activeRegiments () {
    return Api().get('regiments/active')
  }
}
