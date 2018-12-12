<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Add Employee Performance
            <div class="card-btn pull-right">
              <router-link tag="a" to="/performance" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <form id="inputForm"  @submit.prevent="store">
              <div class="form-group row" v-if="auth.role=='superadmin'">
                <label for="regiment_id" class="col-md-3 control-label">Division:</label>
                <div class="col-md-8">
                  <select id="regiment_id" @change="getEmployee" required class="form-control" v-model="form.regiment_id">
                    <option value="" > -select- </option>
                    <option v-for="(reg, indx) in regiment" :key="indx" :value="reg._id"> {{reg.name}} </option>
                  </select>
                </div>
              </div>
              <div class="form-group row  ">
              <label for="employee_id" class="col-md-3 control-label">Employee</label>
              <div class="col-md-8">
                <select id="employee_id" required class="form-control" v-model="form.employee_id">
                  <option value="" selected> -select- </option>
                  <option v-for="(emp, indx) in employees" :key="indx" :value="emp._id"> {{emp.name_english}} </option>
                </select>
              </div>
            </div>
              <div class="form-group row  ">
                <label for="session_id" class="col-md-3 control-label">Session & Month</label>
                <div class="col-md-4">
                  <select id="session_id" required class="form-control" v-model="form.session_id">
                    <option value="" selected> -select- </option>
                    <option v-for="(ses, indx) in session" :key="indx" :value="ses._id"> {{ses.name}} </option>
                  </select>
                </div>
                <div class="col-md-4">
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

            <div class="form-group">
              <table class="table table-bordered" id="autoIncrement">
                <thead>
                <tr>
                  <th width="5%">SL</th>
                  <th> Details </th>
                  <th width="20%"> Percentage </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(n,i) in totalRow" :key="i">
                  <td>{{n}}</td>
                  <td><input class="form-control" v-model="form.details[i].title" type="text" placeholder="Details"></td>
                  <td>
                    <div class="input-group">
                    <input v-model="form.details[i].percentage" type="number" min="0" max="100" placeholder="Percentage" class="form-control" aria-label="Percentage">
                    <span class="input-group-addon">%</span>
                  </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="col-md-12">
                <button v-if="totalRow>1" class="btn btn-danger btn-sm pull-right" type="button" @click="deleteRow()"><i class="fa fa-minus"></i> Delete </button> <button style="margin-right: 5px;" class="btn btn-info btn-sm pull-right" type="button" @click="addMore"> <i class="fa fa-plus"></i> Add More </button>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
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
import PerformanceService from '@/services/hr/employee/PerformanceService'
import FrontendService from '@/services/FrontendService'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'PerformanceCreate',
  data () {
    return {
      form: {
        session_id: '',
        regiment_id: '',
        employee_id: '',
        submit_date: '',
        voucher_no: '',
        details: [{
          title:'',
          percentage:''
        }],
        month: new Date().getMonth()+1,
      },
      session: '',
      months: '',
      employees:'',
      totalRow: 1,
      regiment:'',
      auth: ''
    }
  },
  mounted(){
    this.auth = VueJwtDecode.decode(localStorage.getItem("token"))
    if(this.auth.regiment_id && this.auth.regiment_id!==''){
      this.form.regiment_id = this.auth.regiment_id
    }
    this.form.session_id = this.auth.session
    this.getData()
    this.getEmployee()
  },
  methods: {
    async getData(){
      let ses = await PerformanceService.session()
      this.session = ses.data
      let reg = await FrontendService.regiment()
      this.regiment = reg.data
      this.months = { "1":"January", "2":"February", "3":"March", "4":"April", "5":"May", "6":"June",
        "7":"July", "8":"August", "9":"September", "10":"October", "11":"November", "12":"December" };
    },
    async getEmployee(){
      let employee = await PerformanceService.employee(this.form.regiment_id)
      this.employees = employee.data
    },
    async store () {
      await PerformanceService.store(this.form)
        .then(res => {
          console.clear()
          this.$swal({
            type: 'success',
            title: 'Data Successfully Saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({path: '/performance'})
        })
        .catch(err => {
          this.$swal({
            type: 'warning',
            title: err.response.data,
            showConfirmButton: true,
          })
        })
    },
    addMore(){
      this.totalRow = this.totalRow+1
      this.form.details.push({
        title:'',
        percentage:''
      })
      /*let j = $('#autoIncrement tr').length
      j=j-1;
      let html = '<tr> <td>'+j+'</td> <td><input class="form-control" v-model="form.details['+j+'].title" type="text" placeholder="Details"></td>';
        html+='<td> <div class="input-group"><input v-model="form.details[i].percentage" type="number" min="0" placeholder="Percentage" class="form-control" aria-label="Percentage"><span class="input-group-addon">%</span></div></td>';
      html+='<td><button class="btn btn-danger btn-xs" type="button" @click="deleteRow('+j+')"><i class="fa fa-trash"></i> </button></td></tr>';
      $('#autoIncrement').append(html)*/
    },
    deleteRow(){
      if(this.totalRow>1){
        this.form.details.splice(this.totalRow-1)
        this.totalRow = this.totalRow-1
      }
    }

  }
}
</script>
<style></style>
