import Api from '@/services/Api'

export default {
  index () {
    return Api().get('office-schedule')
  },

  activeRegiments () {
    return Api().get('office-schedule/active-regiment')
  },

  activeSchedule () {
    return Api().get('office-schedule/active-schedule')
  },
  store (params) {
    return Api().post('office-schedule', params)
  },
  update (params) {
    return Api().put('office-schedule/' + params.id, params)
  },

  show (params) {
    return Api().get('office-schedule/' + params.id)
  },
  destroy (id) {
    return Api().delete('office-schedule/' + id)
  }
}
