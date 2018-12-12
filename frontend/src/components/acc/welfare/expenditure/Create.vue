<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
           Expenditure from Welfare
            <div class="card-btn pull-right">
              <router-link tag="a" to="/welfare-expenditure" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <div class="form-group row  ">
                <label for="session_id" class="col-md-3 control-label">Session</label>
                <div class="col-md-8">
                  <select id="session_id" @change="getTotal()" required class="form-control" v-model="form.session_id">
                    <option value="" selected> -select- </option>
                    <option v-for="(ses, indx) in session" :key="indx" :value="ses._id"> {{ses.name}} </option>
                  </select>
                </div>
              </div>
              <div class="form-group row  ">
                <label for="employee_id" class="col-md-3 control-label">Employee</label>
                <div class="col-md-8">
                  <select id="employee_id" required class="form-control" v-model="form.employee_id">
                    <option value="" selected> -select- </option>
                    <option v-for="(employee, indx) in employees" :key="indx" :value="employee._id"> {{employee.name_english}} </option>
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
                <label class="col-md-3 control-label">Expenditure Date</label>
                <div class="col-md-8">
                  <datetime type="date" format="dd-MM-yyyy" input-class="form-control"  placeholder="Select Date" required v-model="form.e_date"></datetime>
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
                    <input type="number" min="0" :max="totalAmount" v-model="form.amount" class="form-control" placeholder="Amount" value="" id="email">
                    <small> Total Welfare Fund : {{totalAmount}} </small>
                  </div>
                </div>
              <div class="form-group row">
                <div class="col-md-3"></div>
                <div class="col-md-9">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import WelfareExpenditureService from '@/services/acc/WelfareExpenditureService'
  export default {
    name: 'CreateBankWithdraw',
    data () {
      return {
        form: {
          session_id: this.$auth.session,
          employee_id: '',
          e_date: '',
          amount: '',
          voucher_no: '',
          details: '',
          month: '',
        },
        session: '',
        months: '',
        employees: '',
        totalAmount: 0
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      async getData(){
        let ses = await WelfareExpenditureService.session()
        this.session = ses.data
        let employee = await WelfareExpenditureService.employee()
        this.employees = employee.data
        this.months = { "1":"January", "2":"February", "3":"March", "4":"April", "5":"May", "6":"June",
          "7":"July", "8":"August", "9":"September", "10":"October", "11":"November", "12":"December" };

      },
      async store () {
        await WelfareExpenditureService.store(this.form)
          .then(res => {
            console.log(res.data)
            this.$swal({
              type: 'success',
              title: 'Data Successfully Saved',
              showConfirmButton: false,
              timer: 1500
            })
            this.$router.push({path: '/welfare-expenditure'})
          })
          .catch(err => {
            console.log(err.response.data)
          })
      },
      async getTotal(){
        let amount = await WelfareExpenditureService.total(this.form.session_id)
        this.totalAmount = amount.data
      }
    }
  }
</script>
<style></style>
