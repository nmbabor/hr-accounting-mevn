<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            Update Office Schedule
            <div class="card-heading-btn pull-right">
              <router-link tag="a" to="/office-schedule" class="btn btn-primary btn-sm" title="View All Regiment"><i class="fa fa-plus-circle"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
              <form @submit.prevent="validateBeforeSubmit">
                <div class="row justify-content-center">
                  <div class="col-md-7">
                    <label class="col-md-12" for="regiment_id">Select Division:</label>
                    <div class="col-md-12">
                      <select class="form-control" id="regiment_id" v-validate="'required'" name="regiment_id" v-model="form.regiment_id">
                        <option v-for="(regiment, index) in regiments" :value="regiment._id" :key="index" disabled="disabled: true"> {{regiment.name}}</option>
                      </select>
                      <span v-if="validateErrors['regiment_id']" class="help text-danger"> Division is required </span>
                      <span v-show="errors.has('regiment_id')" class="help text-danger">{{ errors.first('regiment_id') }}</span>
                    </div>
                  </div>
                </div>
                <br/>
                <div class="row justify-content-center">
                  <div class="col-md-3">
                    <label class="col-md-12"><i class="fa fa-clock-o" aria-hidden="true"></i> In Time: <i class="fa fa-level-down" aria-hidden="true"></i></label>
                    <div class="col-md-12">
                      <datetime name="in_time" type="time" zone="Asia/Dhaka" use12-hour input-class="form-control " v-model="form.in_time"></datetime>
                      <span v-show="errors.has('in_time')" class="help text-danger">{{ errors.first('in_time') }}</span>
                      <span v-if="validateErrors['in_time']" class="help text-danger"> In Time is required </span>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <label class="col-md-12"><i class="fa fa-clock-o" aria-hidden="true"></i> Out Time: <i class="fa fa-level-up" aria-hidden="true"></i></label>
                    <div class="col-md-12">
                      <datetime name="out_time" type="time" zone="Asia/Dhaka" use12-hour input-class="form-control" v-model="form.out_time"></datetime>
                      <span v-show="errors.has('out_time')" class="help text-danger">{{ errors.first('out_time') }}</span>
                      <span v-if="validateErrors['out_time']" class="help text-danger"> Out Time is required </span>
                    </div>
                  </div>
                </div>
                <br/>
                <div  class="row justify-content-center">
                  <div class="col-md-7">
                    <label class="col-md-12">Day Off: </label>
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
                </div>
                <div class="row justify-content-center">
                  <div class="col-md-7">
                    <button type="submit"  class="btn btn-info"> Submit  </button>
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
import OfficeScheduleService from '../../../services/hr/OfficeScheduleService'
import VueJwtDecode from 'vue-jwt-decode'
export default{
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
          {Sat:''}
        ],
        regiment_id: ''
      },
      regiments: '',
      employees: '',
      auth: '',
      scheduleExist: '',
      validateErrors: []
    }
  },
  mounted() {
    let date=new  Date('2018-11-11T13:00:16.883Z')
    console.log(date.toLocaleDateString('en-US',{weekday: 'long'}))
    this.auth = VueJwtDecode.decode(localStorage.getItem("token"))
    this.getData()
  },
  methods: {
    async getData() {
      const response = await OfficeScheduleService.activeRegiments()
      this.regiments = response.data
      const scheduleData = await OfficeScheduleService.show({
        id: this.$route.params.id
      })
      this.form = scheduleData.data
      this.form.in_time = scheduleData.data.in_time
    },
    async validateBeforeSubmit() {
      this.$validator.validateAll()
        .then((resp)=>{
        if (resp){
          this.form.id=this.$route.params.id
          OfficeScheduleService.update(this.form)
            .then(saveData=>{
              this.$swal({
                type: 'success',
                title: 'Office Schedule Update Successfully',
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
              } // end if
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
