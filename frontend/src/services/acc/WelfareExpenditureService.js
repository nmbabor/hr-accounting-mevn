import Api from '@/services/Api'
export default {
  index () {
    return Api().get('welfare-expenditure')
  },
  session () {
    return Api().get('welfare-expenditure/session')
  },
  employee () {
    return Api().get('welfare-expenditure/employee')
  },
  store (params) {
    return Api().post('welfare-expenditure', params)
  },
  total (id) {
    return Api().get('welfare-expenditure/total/' + id)
  },
  update (params) {
    return Api().put('welfare-expenditure/' + params._id, params)
  },
  show (params) {
    return Api().post('welfare-expenditure/show', params)
  },
  edit (id) {
    return Api().get('welfare-expenditure/'+ id)
  }
}
