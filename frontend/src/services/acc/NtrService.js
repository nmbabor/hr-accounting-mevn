import Api from '@/services/Api'

export default {
  index () {
    return Api().get('ntr')
  },

  store (params) {
    return Api().post('ntr', params)
  },

  update (params) {
    return Api().put('ntr/' + params._id, params)
  },

  show (params) {
    return Api().get('ntr/' + params.id)
  },
  fieldValue (params) {
    return Api().get('ntr/' + params.id + '/field-value')
  },
  fields () {
    return Api().get('ntr/fields')
  },
  session () {
    return Api().get('ntr/session')
  },

  destroy (id) {
    return Api().delete('ntr/' + id)
  }
}
