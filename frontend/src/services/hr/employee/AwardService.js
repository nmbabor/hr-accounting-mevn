import Api from '@/services/Api'
export default {
  index () {
    return Api().get('award')
  },
  session () {
    return Api().get('award/session')
  },
  employee (id='') {
    return Api().get('award/employee/'+id)
  },
  store (params) {
    return Api().post('award', params)
  },
  photoUpload (params) {
    return Api().post('award/photo-upload' ,params)
  },

  update (params) {
    return Api().put('award/' + params.id, params)
  },
  edit (params) {
    return Api().get('award/' + params.id)
  },
  destroy (id) {
    return Api().delete('award/' + id)
  }
}
