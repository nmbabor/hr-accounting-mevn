import Api from '@/services/Api'

export default {
  index () {
    return Api().get('budget')
  },

  store (params) {
    return Api().post('budget', params)
  },

  update (params) {
    return Api().put('budget/' + params._id, params)
  },

  show (params) {
    return Api().get('budget/' + params.id)
  },
  heads () {
    return Api().get('budget-head/heads')
  },
  headValue (params) {
    return Api().get('budget/' + params.id + '/heads')
  },
  session () {
    return Api().get('budget-session/active')
  },

  destroy (id) {
    return Api().delete('budget/' + id)
  }
}
