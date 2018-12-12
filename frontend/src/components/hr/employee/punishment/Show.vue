<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Employee Punishment Show
            <div class="card-btn pull-right">
              <button class="btn btn-sm btn-primary" v-print="'#printThis'"><i class="fa fa-print"></i> Print</button>
              <router-link tag="a" to="/punishment" class="btn btn-success btn-sm"><i class="fa fa-list"></i> View All</router-link>
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
                  </div>
                  <div class="row">
                    <div class="col-md-5" style="width: 40%;float: left">
                      <table class="table table-bordered">
                        <tr>
                          <th class="text-right" width="20%"> Employee Name :  </th>
                          <td> {{form.employee.name_english}}  </td>
                        </tr>
                        <tr>
                          <th class="text-right" width="20%"> Employee ID : </th>
                          <td> {{form.employee.personal_id}}  </td>
                        </tr>
                        <tr>
                          <th class="text-right" width="20%"> Designation : </th>
                          <td> {{form.employee.designation}}  </td>
                        </tr>

                      </table>
                    </div>
                    <div class="col-md-2" style="width: 20%;float: left"></div>
                    <div class="col-md-5" style="width: 40%;float: right">
                      <table class="table table-bordered">
                        <tr>
                          <th class="text-right" width="20%"> Date: </th>
                          <td> {{form.submit_date.slice(0,10)}}  </td>
                        </tr>
                        <tr>
                          <th class="text-right" width="20%"> Month : </th>
                          <td> {{form.month | monthName}} </td>
                        </tr>
                        <tr>
                          <th class="text-right" width="20%"> Session : </th>
                          <td> {{form.session.name}}  </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div class="row">

                    <div class="col-md-12">
                      <h5 class="text-center"> Details </h5>
                      <hr>
                    </div>

                    <div class="col-md-12">
                      <h4 class="text-center"><u>{{form.title}}</u> </h4>
                    </div>
                    <div class="col-md-12">
                      <div v-html="form.details"></div>
                    </div>
                  </div>
                  <br>
                  <br>
                  <div class="row">
                    <div class="col-md-4 text-center" style="width: 33%;float: left;">
                      <p>----------------------------<br>Employee Signature</p>
                    </div>
                    <div class="col-md-4 text-center" style="width: 33%;float: left;">
                      <p>----------------------------<br>Manager Signature</p>
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
  import PunishmentService from '@/services/hr/employee/PunishmentService'
  export default {
    name: 'ShowPunishment',
    data () {
      return {
        form: {
          employee:{},
          session:{},
          submit_date: ''
        },
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
        const response = await PunishmentService.edit({
          id: this.$route.params.id
        })
        this.form = response.data
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
