import Api from '@/services/Api'

export default {
  regiments () {
    return Api().get('reports/regiment')
  },
  totalReceived () {
    return Api().get('reports/budget')
  },
  distribute (id) {
    return Api().get('reports/budget-distribute/' + id)
  },
  expenditure () {
    return Api().get('reports/expenditure')
  },
  regExpenditure (id) {
    return Api().get('reports/expenditure/' + id)
  },
  welfare (id) {
    return Api().get('reports/welfare/' + id)
  },
  welfareExpenditure (id) {
    return Api().get('reports/welfare-expenditure/' + id)
  },
  ntrTotal () {
    return Api().get('reports/ntr-total')
  },
  ntrDeposit (id) {
    return Api().get('reports/ntr-deposit/'+ id)
  },
}
