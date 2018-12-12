import Api from '@/services/Api'

export default {
  show (params) {
    return Api().post('ntr-find', params)
  },
  regiments () {
    return Api().get('ntr-find/regiments')
  },
  sessions () {
    return Api().get('ntr-find/sessions')
  }
}
