import Api from '@/services/Api'

export default {
  regiments () {
    return Api().get('budget-distribution/regiment')
  },
  store (params) {
    return Api().post('budget-distribution', params)
  },
  show (params) {
    return Api().get('budget-distribution/' + params.id)
  },
  headValue (params) {
    return Api().get('budget/' + params.id + '/heads')
  }
}
