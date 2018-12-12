import Api from '@/services/Api'

export default {
  show (params) {
    return Api().post('budget-find', params)
  },
  regiments () {
    return Api().get('budget-find/regiments')
  },
  sessions () {
    return Api().get('budget-find/sessions')
  }
}
