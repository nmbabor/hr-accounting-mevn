import Api from '@/services/Api'

export default {
  index () {
    return Api().get('salary-step')
  },

  store (params) {
    return Api().post('salary-step', params)
  },

  update (params) {
    return Api().put('salary-step/' + params._id, params)
  },

  show (params) {
    return Api().get('salary-step/' + params.id)
  },

  delete (id) {
    return Api().delete('salary-step/' + id)
  },
  activeSalarySteps () {
    return Api().get('salary-step/active')
  }
}
