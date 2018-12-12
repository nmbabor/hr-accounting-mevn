<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Add New NTR
            <div class="card-btn pull-right">
              <router-link tag="a" to="/ntr" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="form-group row">
              <div class="col-md-4 row">
                <label for="session_id" class="col-md-12"> Session </label>
                <div class="col-md-12">
                  <select id="session_id" required class="form-control" v-model="form.session_id">
                    <option value="" selected> -select- </option>
                    <option v-for="(ses, indx) in session" :key="indx" :value="ses._id"> {{ses.name}} </option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <label class="col-md-12">NTR Date</label>
                <div class="col-md-12">
                  <datetime type="date" format="dd-MM-yyyy" input-class="form-control"  placeholder="Select Date" required v-model="form.ntr_date"></datetime>
                </div>
              </div>
              <div class="col-md-4">
                <label for="amount" class="col-md-12">Total Amount</label>
                <div class="col-md-12">
                  <input type="number" min="0" v-model="form.amount" class="form-control" placeholder="Budget Amount" id="amount">
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table table-bordered min-padding-table">
                    <tr>
                      <th width="10%">Economic Code</th>
                      <th>Description</th>
                      <th width="40%">Amount</th>
                    </tr>
                    <tr  v-for="(head, index) in heads" :key="index">
                      <td> {{head.code}} </td>
                      <td> {{head.name}}</td>
                      <td><input type="number" v-model="form.head_value[index].amount" min="0" placeholder="Amount" required class="form-control min-height min-height">
                       <input type="hidden" v-model="form.head_value[index].field_id"> </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <button type="submit" @click="store" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NtrService from '@/services/acc/NtrService'
export default {
  name: 'BudgetAdd',
  data () {
    return {
      form: {
        session_id: '',
        ntr_date: new Date().toJSON().slice(0,10),
        amount: 0,
        head_value: [],
      },
      heads: [],
      session: '',

    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    restAmount: function () {
      return this.form.amount
    }
  },
  methods: {
    async getData(){
      let head = await NtrService.fields()
      this.heads = head.data
      let i = 0
      let newHead = []
      for (i=0; i < this.heads.length; i++) {
        newHead.push({field_id:this.heads[i]._id, amount: 0})
      }
      this.form.head_value = newHead
      let ses = await NtrService.session()
      this.session = ses.data
    },
    async store () {
      await NtrService.store(this.form)
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Data Successfully Saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({path: '/ntr'})
        })
        .catch(err => {
          this.$swal({
            type: 'error',
            title: err.response.data,
            showConfirmButton: true
          })
        })
    }
  }
}
</script>
<style></style>
