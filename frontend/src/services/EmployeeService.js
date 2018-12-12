import Api from '@/services/Api'

export default {
  index () {
    return Api().get('employees')
  },

  empDataSave (params) {
    return Api().post('employees/emp-data-save', params)
  },

  activeRegiments () {
    return Api().get('employees/active-regiment')
  },
  store (params) {
    return Api().post('employees', params)
  },

  update (params) {
    return Api().put('employees/' + params.id, params)
  },

  show (params) {
    return Api().get('employees/' + params.id)
  },

  destroy (id) {
    return Api().delete('employees/' + id)
  },
  employeePhotoUpload (params) {
    return Api().post('employees/photo-upload' ,params)
  },

  importEmployee (params) {
    return Api().post('employees/import', params)
  }
}
