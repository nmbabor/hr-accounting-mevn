import Api from '@/services/Api'

export default {
  allSection () {
    return Api().get('users')
  },
  store (params) {
    return Api().post('users', params)
  },

  update (params) {
    return Api().put('users/' + params.id, params.input)
  },

  show (params) {
    return Api().get('users/' + params.id)
  },
  delete (id) {
    return Api().delete('users/' + id)
  },
  login (params) {
    return Api().post('users/login', params)
  }
}
