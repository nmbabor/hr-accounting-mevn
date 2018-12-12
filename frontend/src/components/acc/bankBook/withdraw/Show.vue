<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Bank Book Show
            <div class="card-btn pull-right">
              <button class="btn btn-sm btn-primary" v-print="'#printThis'"><i class="fa fa-print"></i> Print</button>
              <router-link tag="a" to="/bank-withdraw" class="btn btn-success btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-10" id="printThis">
                <div class="table-responsives">
                  <div class="text-center">
                    <print-header></print-header>
                    <br>
                    <h5> Credit Voucher </h5>
                    <h6><u> </u></h6>
                    <br>
                  </div>
                  <div class="row">
                    <div class="col-md-5" style="width: 40%;float: left">
                    </div>
                    <div class="col-md-2" style="width: 20%;float: left"></div>
                    <div class="col-md-5" style="width: 40%;float: right">
                      <table class="table table-bordered">
                        <tr>
                          <th class="text-right" width="20%"> Voucher No : </th>
                          <td> {{form.voucher_no}}  </td>
                        </tr>
                        <tr>
                          <th class="text-right" width="20%"> Date: </th>
                          <td> {{form.withdraw_date}}  </td>
                        </tr>
                        <tr>
                          <th class="text-right" width="20%"> Month : </th>
                          <td> {{form.month | monthName}} </td>
                        </tr>
                      </table>
                    </div>
                  </div>

                  <table class="table table-bordered">
                    <tr>
                      <th width="5%">SL</th>
                      <th>Head Name</th>
                      <th>Details</th>
                      <th>Amount</th>
                    </tr>
                    <tr>
                      <td>1.</td>
                      <td> {{form.name}}  </td>
                      <td> {{form.details}}  </td>
                      <td> {{form.amount}}  </td>
                    </tr>
                  </table>
                  <div class="row">
                    <div class="col-md-8" style="width: 67%;float: left"></div>
                    <div class="col-md-4" style="width: 33%;float: right">
                      <table class="table table-bordered">
                        <tr>
                          <th class="text-right" width="20%"> Total Amount : </th>
                          <td> {{form.amount}}  </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <br>
                  <br>
                  <div class="row">
                    <div class="col-md-4 text-center" style="width: 33%;float: left;">
                      <p>----------------------------<br>Received By</p>
                    </div>
                    <div class="col-md-4 text-center" style="width: 33%;float: left;">
                      <p>----------------------------<br>Prepared By</p>
                    </div>
                    <div class="col-md-4 text-center" style="width: 34%;float: right;">
                      <p>----------------------------<br>Authorized By</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PrintHeader from '@/components/pad/Header'
  import BankWithdrawService from '@/services/acc/BankWithdrawService'
  export default {
    name: 'ShowBankWithdraw',
    data () {
      return {
        form: {}
      }
    },
    components:{
      'print-header': PrintHeader
    },
    mounted(){
      this.getData()
    },
    methods: {
      async getData(){
        const response = await BankWithdrawService.edit(this.$route.params.id)
        this.form = response.data
        this.form.withdraw_date = this.form.withdraw_date.slice(0,10)
      }
    },
    filters:{
      monthName: function (value) {
        var monthNames = [ "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December" ];
        let ind = value-1;
        return monthNames[ind]

      }
    }
  }
</script>
<style></style>
