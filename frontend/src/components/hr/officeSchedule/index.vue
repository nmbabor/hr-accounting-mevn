<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
            </div>
            <h4 class="card-title"> All Employees </h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="validateBeforeSubmit">
              <div class="form-group row ">
                <div class="col-md-3">
                  <label class="col-md-12" for="regiment_id">Select Regiment:</label>
                  <div class="col-md-12">
                    <select class="form-control" id="regiment_id" name="regiment_id" v-validate="'required'" v-model="form.regiment_id">
                      <option value="">Select Section</option>
                      <option v-for="(regiment, index) in regiments" :value="regiment._id" :key="index" > {{regiment.name}}</option>
                    </select>
                    <span v-if="validateErrors['regiment_id']" class="help text-danger"> Regiment is required </span>
                    <span v-show="errors.has('regiment_id')" class="help text-danger">{{ errors.first('regiment_id') }}</span>
                  </div>
                </div>
                <div class="col-md-2">
                  <label class="col-md-12"><i class="fa fa-clock-o" aria-hidden="true"></i> In Time: <i class="fa fa-level-down" aria-hidden="true"></i></label>
                  <div class="col-md-12">
                    <datetime name="in_time" type="time" zone="Asia/Dhaka" use12-hour input-class="form-control" v-validate="'required'" v-model="form.in_time" ></datetime>
                    <span v-show="errors.has('in_time')" class="help text-danger">{{ errors.first('in_time') }}</span>
                    <span v-if="validateErrors['in_time']" class="help text-danger"> In Time is required </span>
                    <!--<span v-for="(err, ind) in validateErrors['in_time']" class="help text-danger" :key="ind">{{ err }}</span>-->
                  </div>
                </div>
                <div class="col-md-2">
                  <label class="col-md-12"><i class="fa fa-clock-o" aria-hidden="true"></i> Out Time: <i class="fa fa-level-up" aria-hidden="true"></i></label>
                  <div class="col-md-12">
                    <datetime name="out_time" type="time" zone="Asia/Dhaka" use12-hour input-class="form-control" v-validate="'required'" v-model="form.out_time" ></datetime>
                    <span v-show="errors.has('out_time')" class="help text-danger">{{ errors.first('out_time') }}</span>
                    <span v-if="validateErrors['out_time']" class="help text-danger"> Out Time is required </span>
                  </div>
                </div>
                <div class="col-md-4">
                  <label class="col-md-12">Day Off :</label>
                  <div class="col-md-12">
                    <label><input type="checkbox" v-model="form.day_off[6].Sat" />Saturday</label>
                    <label><input type="checkbox" v-model="form.day_off[0].Sun" />Sunday</label>
                    <label><input type="checkbox" v-model="form.day_off[1].Mon" />Monday</label>
                    <label><input type="checkbox" v-model="form.day_off[2].Tue" />Tuesday</label>
                    <label><input type="checkbox" v-model="form.day_off[3].Wed" />Wednesday</label>
                    <label><input type="checkbox" v-model="form.day_off[4].Thu" />Thursday</label>
                    <label><input type="checkbox" v-model="form.day_off[5].Fri" />Friday</label>
                  </div>
                </div>
                <div class="col-md-1">
                  <button type="submit"  class="btn btn-info pull-right"> Submit  </button>
                </div>
              </div>
            </form>
            <hr>
            <div class="table-responisve">
              <table id="datatable" class="table table-striped table-bordered">
                <thead>
                <tr>
                  <th width="5%">SL</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Regiment</th>
                  <th>Status</th>
                  <th colspan="2" width="10%">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(data,index) in officeSchedules" :key="index">
                  <td>{{index+1}}</td>
                  <td>{{new Date(data.in_time).toLocaleTimeString()}}</td>
                  <td>{{new Date(data.out_time).toLocaleTimeString()}}</td>
                  <td>{{data.name}}</td>
                  <td>
                    <span v-if="data.status==1" class="text-success" title="Complete"><i class="fa fa-check-circle-o fa-2x"></i></span>
                    <span v-else class="text-danger" title="Incomplete"><i class="fa fa-times-circle-o fa-2x"></i></span>
                  </td>
                  <td>
                    <router-link tag="a" v-bind:to="{ name: 'officeScheduleEdit', params: { id: data._id } }" class="btn btn-xs btn-warning"><i class="fa fa-edit"></i></router-link>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import OfficeScheduleService from '@/services/hr/OfficeScheduleService'
  export default {
    name: 'employee',
    data () {
      return {
        form: {
          day_off:[
            {Sun:''},
            {Mon:''},
            {Tue:''},
            {Wed:''},
            {Thu:''},
            {Fri:''},
            {Sat:''},
          ],
          regiment_id: ''
        },
        officeSchedules: '',
        regiments: '',
        employees: '',
        auth: '',
        scheduleExist: '',
        validateErrors: []
      }
    },
    mounted () {
      this.getEmployee()
      this.getData()
    },
    methods: {
      async getData() {
        const response = await OfficeScheduleService.activeRegiments()
        this.regiments = response.data
      },
      async getEmployee () {
        const response = await OfficeScheduleService.index()
        this.officeSchedules = response.data
      },
      async validateBeforeSubmit() {
        this.$validator.validateAll()
          .then((resp)=>{
            if (resp){
              OfficeScheduleService.store(this.form)
                .then(saveData=>{
                  this.getEmployee()
                  this.$swal({
                    type: 'success',
                    title: 'Attendance Data Successfully Saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                })
                .catch(err=>{
                  this.validateErrors=err.response.data
                  if (err.response.data.scheduleExist) {
                    this.$swal({
                      title: err.response.data.scheduleExist,
                      type: 'warning',
                      showCancelButton: true,
                    })
                  } // end if ------
                })
            } // respones ---------
          })
          .catch(function(e) {
            console.log('catch')
          })
      }
    }
  }
</script>
<style></style>
