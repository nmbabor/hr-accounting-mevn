import Api from '../Api'

export default {
  index () {
    return Api().get('attendance')
  },
  activeRegiments () {
    return Api().get('attendance/active-regiment')
  },

  officeSchedule (params) {
    return Api().get('attendance/office-schedule', params)
  },

  store (params) {
    return Api().post('attendance', params)
  },

  update (params) {
    return Api().put('attendance', params)
  },

  show (params) {
    return Api().get('attendance/show', {params})
  },

  destroy (params) {
    return Api().delete('attendance', {params})
  },

  departments () {
    return Api().get('attendance/department')
  },
  employee (id) {
    return Api().get('attendance/' + id + '/employee')
  },
  checkAttendance (params) {
    return Api().get('attendance/check-attendance', params)
  }
}
