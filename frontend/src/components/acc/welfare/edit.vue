<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Edit Welfare Fund
            <div class="card-btn pull-right">
              <router-link tag="a" to="/welfare" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="form-group row  ">
              <label for="session_id" class="col-md-3 control-label">Session</label>
              <div class="col-md-8">
                <select id="session_id" required class="form-control" v-model="form.session_id">
                  <option value="" selected> -select- </option>
                  <option v-for="(ses, indx) in session" :key="indx" :value="ses._id"> {{ses.name}} </option>
                </select>
              </div>
            </div>
            <div class="form-group row  ">
              <label for="month" class="col-md-3 control-label">Month</label>
              <div class="col-md-8">
                <select id="month" required class="form-control" v-model="form.month">
                  <option value="" selected> -select- </option>
                  <option v-for="(month, indx) in months" :key="indx" :value="indx"> {{month}} </option>
                </select>
              </div>
            </div>
            <div class="form-group row  ">
              <label class="col-md-3 control-label">Submit Date</label>
              <div class="col-md-8">
                <datetime type="date" format="dd-MM-yyyy" input-class="form-control"  placeholder="Select Date" required v-model="form.submit_date"></datetime>
              </div>
            </div>
            <div class="form-group row  ">
              <label for="voucher_no" class="col-md-3 control-label">Voucher No</label>
              <div class="col-md-8">
                <input type="text" v-model="form.voucher_no" class="form-control" placeholder="Voucher No" value="" id="voucher_no">
              </div>
            </div>
            <div class="form-group row  ">
              <label for="details" class="col-md-3 control-label">Details</label>
              <div class="col-md-8">
                <input type="text" v-model="form.details" class="form-control" placeholder="Details" value="" id="details">
              </div>
            </div>
            <div class="form-group row  ">
              <label for="email" class="col-md-3 control-label">Amount</label>
              <div class="col-md-8">
                <input type="number" min="0" v-model="form.amount" class="form-control" placeholder="Amount" value="" id="email">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-3"></div>
              <div class="col-md-9">
                <button type="submit" @click="update" class="btn btn-primary">Save Change</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import WelfareService from '@/services/acc/WelfareService'
  export default {
    name: 'EditWelfare',
    data () {
      return {
        form: {
          session_id: '',
          submit_date: '',
          amount: '',
          voucher_no: '',
          details: '',
          month: ''

        },
        session: ''
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      async getData(){
        let ses = await WelfareService.session()
        this.session = ses.data
      const response = await WelfareService.edit({
        id: this.$route.params.id
      })
      this.form = response.data
      this.form.id = this.$route.params.id
      this.months = { "1":"January", "2":"February", "3":"March", "4":"April", "5":"May", "6":"June",
          "7":"July", "8":"August", "9":"September", "10":"October", "11":"November", "12":"December" };
    },

    async update () {
      await WelfareService.update(this.form)
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Data Successfully Update',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style></style>
