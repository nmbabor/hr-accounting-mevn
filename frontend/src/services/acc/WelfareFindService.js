import Api from '@/services/Api'

export default {
  show (params) {
    return Api().post('welfare-find', params)
  },
  regiments () {
    return Api().get('welfare-find/regiments')
  },
  sessions () {
    return Api().get('welfare-find/sessions')
  }
}
