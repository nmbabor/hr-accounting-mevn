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
                  <div class="col-md-4" v-if="auth.role=='superadmin'">
                    <label class="col-md-12" for="regiment_id">Select Division:</label>
                    <div class="col-md-12">
                      <select class="form-control" id="regiment_id" required v-model="form.regiment_id">
                        <option value="">-select division-</option>
                        <option v-for="(regiment, index) in regiments" :value="regiment._id" :key="index" required> {{regiment.name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label class="col-md-12">Select Date:</label>
                    <div class="col-md-12">
                      <datetime type="date" format="dd-MM-yyyy" input-class="form-control"  placeholder="Select Date" required v-model="form.attendance_date"></datetime>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <label class="control-label col-md-12"> &nbsp; </label>
                    <div class="col-md-12">
                      <button type="button" @click="loadEmployee()" class="btn btn-primary btn-sm" id="load-attendance" title="Click for load employee">Load</button>
                    </div>
                  </div>
                </div>

              <div class="col-md-12">

                 <div class="table-responsive">
                   <table class="table table-bordered table-striped">
                     <thead>
                     <tr>
                       <td width="15%">Personal Numbr</td>
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
                     <tr v-for="(employee, index) in employees" :key="index">
                       <td> {{employee.personal_id}} <input type="hidden" v-model="form.employee_id[index]" > </td>
                       <td> {{employee.name_english}}</td>
                       <td> {{employee.designation}}</td>
                       <td>
                         <label class="w-100"> <input v-model="form.day_status[index]" required  class="wh-17 checked checkbox-2 pointer present" type="radio" v-bind:id="'work-'+index" value="1"> Working </label>
                       </td>
                       <td>
                         <label class="w-100"> <input v-model="form.day_status[index]" required  class="wh-17 checked checkbox-2 pointer present" type="radio" v-bind:id="'off-'+index" value="0"> Day Off </label>
                       </td>
                       <td>
                         <datetime name="in_time[]" v-validate="'required'" type="time" use12-hour input-class="form-control timepicker" v-model="form.in_time[index]">
                         </datetime>
                       </td>
                       <td>
                         <datetime name="out_time[]" type="time"  use12-hour input-class="form-control timepicker"  v-model="form.out_time[index]"></datetime>
                       </td>
                       <td><label class="w-100"> <input v-model="form.attendance[index]" required  class="wh-17 checked checkbox-2 pointer present" type="radio" v-bind:id="'p-'+index" value="1">  </label> </td>
                       <td><label class="w-100"> <input  v-model="form.attendance[index]" required class="wh-17 checked checkbox-2 pointer" type="radio" v-bind:id="'a-'+index" value="0">  </label> </td>
                       <td><label class="w-100"> <input  v-model="form.attendance[index]" required class="wh-17 checked checkbox-2 pointer" type="radio" v-bind:id="'l-'+index" value="2">  </label> </td>
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
        day_status: [],
        employee_id: [],
        regiment_id: '',
        in_time: [],
        out_time: [],
        attendance: [],
      },
      regiments: '',
      employees: '',
      auth: ''
    }
  },
  mounted() {
    this.auth = VueJwtDecode.decode(localStorage.getItem("token"))
    if(this.auth.regiment_id && this.auth.regiment_id!==''){
      this.form.regiment_id = this.auth.regiment_id
    }
    this.getData()
  },
  methods: {
    async getData() {
      const response = await AttendanceService.activeRegiments()
      this.regiments = response.data
    },
    async loadEmployee() {
      if (this.form.regiment_id != '' & this.form.attendance_date != '') {
        let params = {regiment_id: this.form.regiment_id, attendance_date: this.form.attendance_date}
        const checkAttn = AttendanceService.checkAttendance({params}).then(result => {
          AttendanceService.employee(this.form.regiment_id).then(employee => {
            //console.log({regiment_id:this.form.regiment_id})
            AttendanceService.officeSchedule({params})
              .then(officeSchedule=>{
                console.log(officeSchedule)
                if(officeSchedule.data.scheduleData!==''){ // if office schedule assign for this regiment
                  this.employees = employee.data
                  let i;
                  let lengthEm = employee.data.length
                  for(i=0;i<lengthEm;i++){
                    this.form.employee_id[i] = this.employees[i]._id
                    this.form.attendance[i] = 1
                    this.form.day_status[i] = officeSchedule.data.day_staus
                    this.form.in_time[i] = officeSchedule.data.scheduleData.in_time
                    this.form.out_time[i] = officeSchedule.data.scheduleData.out_time
                    console.log(officeSchedule.data.day_staus)
                  }
                }else { // if office schedule not assign for this regiment ----
                  this.$swal({
                    title: 'Please assign office schedule first !',
                    type: 'warning',
                    showCancelButton: true,
                  })
                }
              })
              .catch(err=>{ // if error found to get office schedule -
                this.$swal({
                  title: err,
                  type: 'warning',
                  showCancelButton: true,
                })
              })
          })
        }).catch(err=>{
          this.$swal({
            title: err.response.data,
            type: 'warning',
            showCancelButton: true,
          })
        })
      }else{
        console.log('Empty')
      }
    },
    async validateBeforeSubmit() {
      this.$validator.validateAll()
        .then((resp)=>{
        if (resp){
          AttendanceService.store(this.form)
            .then(saveData=>{
              this.$swal({
                type: 'success',
                title: 'Attendance Data Successfully Saved',
                showConfirmButton: false,
                timer: 1500
              })
              this.$router.push({path: '/attendance'})

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
