import Api from '@/services/Api'

export default {
  index () {
    return Api().get('salary-grade')
  },

  store (params) {
    return Api().post('salary-grade', params)
  },

  update (params) {
    return Api().put('salary-grade/' + params._id, params)
  },

  show (params) {
    return Api().get('salary-grade/' + params.id)
  },

  delete (id) {
    return Api().delete('salary-grade/' + id)
  },
  activeSalaryGrades () {
    return Api().get('salary-grade/active')
  }
}
