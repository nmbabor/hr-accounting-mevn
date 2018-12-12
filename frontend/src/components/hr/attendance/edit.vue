<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            Attendance Submit
            <div class="card-heading-btn pull-right">
              <router-link tag="a" to="/attendance" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All </router-link>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="validateBeforeSubmit">
              <div class="form-group row ">
                <div class="col-md-4">
                  <label class="col-md-12">Select Division:</label>
                  <div class="col-md-12">
                    <span class="form-control"> {{form.regiment_name}} </span>
                  </div>
                </div>
                <div class="col-md-4">
                  <label class="col-md-12">Select Date:</label>
                  <div class="col-md-12">
                    <span class="form-control">{{form.attendance_date.slice(0,10)}}</span>
                  </div>
                </div>
              </div>

              <div class="col-md-12">

                <div class="table-responsive">
                  <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                      <td width="15%">Employee ID</td>
                      <td width="15%"> Name </td>
                      <td width="15%"> Designation </td>
                      <td width="15%"> Working Day </td>
                      <td width="15%"> Day Off </td>
                      <td width="12%"> In Time </td>
                      <td width="12%"> Out Time </td>
                      <td width="5%">Present</td>
                      <td width="5%"> Absence </td>
                      <td width="5%"> Leave </td>
                    </tr>
                    </thead>
                    <tr v-for="(attn, index) in form.attendance" :key="index">
                      <td> {{attn.personal_id}} <input type="hidden" v-model="attn.employee_id" > </td>
                      <td> {{attn.name_english}}</td>
                      <td> {{attn.designation}}</td>
                      <td>
                        <label class="w-100"> <input v-model="attn.day_status" required  class="wh-17 checked checkbox-2 pointer present" type="radio" v-bind:id="'work-'+index" value="1"> Working </label>
                      </td>
                      <td>
                        <label class="w-100"> <input v-model="attn.day_status" required  class="wh-17 checked checkbox-2 pointer present" type="radio" v-bind:id="'off-'+index" value="0"> Day Off </label>
                      </td>
                      <td>
                        <datetime name="in_time[]" v-validate="'required'" type="time" use12-hour input-class="form-control timepicker" v-model="attn.in_time">
                        </datetime>
                        <span v-show="errors.has('regiment_id')" class="help text-danger">{{ errors.first('regiment_id') }}</span>
                      </td>
                      <td>
                        <datetime name="out_time[]" type="time"  use12-hour input-class="form-control timepicker"  v-model="attn.out_time"></datetime>
                      </td>
                      <td><label class="w-100"> <input v-model="attn.attendance" required  class="wh-17 checked checkbox-2 pointer present" type="radio" v-bind:id="'p-'+index" value="1">  </label> </td>
                      <td><label class="w-100"> <input  v-model="attn.attendance" required class="wh-17 checked checkbox-2 pointer" type="radio" v-bind:id="'a-'+index" value="0">  </label> </td>
                      <td><label class="w-100"> <input  v-model="attn.attendance" required class="wh-17 checked checkbox-2 pointer" type="radio" v-bind:id="'l-'+index" value="2">  </label> </td>
                    </tr>
                  </table>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <button type="submit"  class="btn btn-info pull-right"> Submit  </button>
                  </div>
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
  import AttendanceService from '../../../services/hr/AttendanceService'
  import VueJwtDecode from 'vue-jwt-decode'
  export default{
    name: 'AttendanceCreate',
    data () {
      return {
        form: {
          regiment_id: '',
          attendance_date: '',
          attendance:[
            {
              day_status: '',
              employee_id: '',
              in_time: '',
              out_time: '',
              attendance: '',
            }
          ],
        },
        allData: [],
        regiments: '',
        employees: '',
        auth: ''
      }
    },
    mounted() {
      this.auth = VueJwtDecode.decode(localStorage.getItem("token"))
      //this.employee.regiment_id=this.auth.regiment_id

      this.getData()
    },
    methods: {
      async getData() {
        const response = await AttendanceService.show(this.$route.query)
        let allData = response.data.attendance
        this.form.regiment_name = response.data.info.regiment_name
        this.form.regiment_id = response.data.info.regiment_id
        this.form.attendance_date = response.data.info.attendance_date
        let regiment = await AttendanceService.activeRegiments()
        this.regiments = regiment.data
        let i;
        this.form.attendance = [];
        for( i=0;i<allData.length;i++){
          this.form.attendance.push({
            day_status: allData[i].day_status,
            employee_id: allData[i].employee_id,
            in_time: allData[i].in_time,
            out_time: allData[i].out_time,
            attendance: allData[i].attendance,
            personal_id:allData[i].employee.personal_id,
            name_english:allData[i].employee.name_english,
            designation:allData[i].employee.designation,
          })
        }
      },
      async validateBeforeSubmit() {
        this.$validator.validateAll()
          .then((resp)=>{
            if (resp){
              AttendanceService.update(this.form)
                .then(saveData=>{
                  console.log(saveData.data)
                  this.$swal({
                    type: 'success',
                    title: 'Attendance Data Successfully Saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  //this.$router.push({path: '/attendance/create'})

                })
                .catch(err=>{
                  this.$swal({
                    title: err.response.data,
                    type: 'warning',
                    showCancelButton: true,
                  })
                })
            } // respones ---------
          })
          .catch(function(e) {
            console.log('catch')
          })
      }
    },
    created() {

    }
  }
</script>
