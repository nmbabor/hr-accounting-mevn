<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Expenditure From Budget
            <div class="card-btn pull-right">
              <router-link tag="a" to="/expenditure" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <div class="form-group row  ">
                <label for="session_id" class="col-md-3 control-label">Session</label>
                <div class="col-md-8">
                  <select id="session_id" @change="information()" required class="form-control" v-model="form.session_id">
                    <option value="" selected> -select- </option>
                    <option v-for="(ses, indx) in session" :key="indx" :value="ses._id"> {{ses.name}} </option>
                  </select>
                </div>
              </div>
              <div class="form-group row  ">
                <label for="head_id" class="col-md-3 control-label">Budget Heads </label>
                <div class="col-md-8">
                  <select id="head_id" required class="form-control" @change="information()" v-model="form.head_id">
                    <option value="" selected> -select- </option>
                    <option v-for="(head, indx) in heads" :key="indx" :value="head._id"> {{head.name}} </option>
                  </select>
                  <small> Expensed: {{expense.expense_amount}}, Budget: {{expense.amount}} </small>
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
                  <datetime type="date" format="dd-MM-yyyy" input-class="form-control"  placeholder="Select Date" required v-model="form.expenditure_date"></datetime>
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
              <span v-if="expense.type===0">
                <div class="form-group row  ">
                  <label for="type" class="col-md-3 control-label"> Transaction Type  </label>
                  <div class="col-md-8">
                    <select id="type" required class="form-control" v-model="form.transection_type">
                      <option value="" selected> -select- </option>
                      <option value="1"> Normal Payment by cheque </option>
                      <option value="2"> Store in Bank Book </option>
                    </select>
                  </div>
                </div>
                <div class="form-group row  ">
                  <label for="cheque_no" class="col-md-3 control-label">Cheque No</label>
                  <div class="col-md-8">
                    <input type="text" v-model="form.cheque_no" class="form-control" placeholder="Cheque No" value="" id="cheque_no">
                  </div>
                </div>
                <div class="form-group row  ">
                  <label class="col-md-3 control-label">Cheque Date</label>
                  <div class="col-md-8">
                    <datetime type="date" format="dd-MM-yyyy" input-class="form-control"  placeholder="Cheque Date" required v-model="form.cheque_date"></datetime>
                  </div>
                </div>
                <div class="form-group row  ">
                  <label for="issuing_bank" class="col-md-3 control-label">Issuing Bank</label>
                  <div class="col-md-8">
                    <input type="text" v-model="form.issuing_bank" class="form-control" placeholder="Details" value="" id="issuing_bank">
                  </div>
                </div>
              </span>
              <div class="form-group row  ">
                <label for="email" class="col-md-3 control-label">Amount</label>
                <div class="col-md-8">
                  <input type="number" min="0" :max="expense.amount-expense.expense_amount" v-model="form.amount" class="form-control" placeholder="Amount" value="" id="email">
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
  import ExpenditureService from '@/services/acc/ExpenditureService'
  export default {
    name: 'CreateExpenditure',
    data () {
      return {
        form: {
          session_id: this.$auth.session,
          head_id: '',
          expenditure_date: '',
          amount: '',
          voucher_no: '',
          details: '',
          month: '',
          transection_type: '',
          issuing_bank: '',
          cheque_date: '',
          cheque_no: '',


        },
        session: '',
        months: '',
        heads: '',
        expense:{
          amount: 0,
          expense_amount: 0,
          type: 0
        }
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      async getData(){
        let ses = await ExpenditureService.session()
        this.session = ses.data
        let head = await ExpenditureService.heads()
        this.heads = head.data
        this.months = { "1":"January", "2":"February", "3":"March", "4":"April", "5":"May", "6":"June",
          "7":"July", "8":"August", "9":"September", "10":"October", "11":"November", "12":"December" };
      },
      async store () {
        await ExpenditureService.store(this.form)
          .then(res => {
            this.$swal({
              type: 'success',
              title: 'Data Successfully Saved',
              showConfirmButton: false,
              timer: 1500
            })
            this.$router.push({path: '/expenditure'})
          })
          .catch(err => {
            console.log(err.response.data)
          })
      },
      async information(){
        let info = await ExpenditureService.info({
          session_id: this.form.session_id,
          head_id: this.form.head_id
        })
        this.expense = info.data
        console.log(this.expense)
      }
    }
  }
</script>
<style></style>
