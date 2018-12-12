import Api from '@/services/Api'

export default {
  index () {
    return Api().get('ranks')
  },

  store (params) {
    return Api().post('ranks', params)
  },

  update (params) {
    return Api().put('ranks/' + params._id, params)
  },

  show (params) {
    return Api().get('ranks/' + params.id)
  },

  delete (id) {
    return Api().delete('ranks/' + id)
  },
  activeRanks () {
    return Api().get('ranks/active')
  }
}
