<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Edit Employee Punishment
            <div class="card-btn pull-right">
              <router-link tag="a" to="/punishment" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <form method="POST" @submit.prevent="update" id="saveEmployee" accept-charset="UTF-8" class="form-horizontal" enctype="multipart/form-data">
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
                <label for="title" class="col-md-3 control-label">Title</label>
                <div class="col-md-8">
                  <input id="title" type="text" class="form-control" placeholder="Award Title" required v-model="form.title" >
                </div>
              </div>

              <div class="form-group row  ">
                <label for="description" class="col-md-3 control-label">Description</label>
                <div class="col-md-8">
                  <editor id="description" theme='modern' plugins='code link lists' toolbar='formatselect | bold italic strikethrough | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat' v-model="form.details"  placeholder="Description" class="form-control text-editor" ></editor>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-3"></div>
                <div class="col-md-8">
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
import Editor from '@tinymce/tinymce-vue';
import PunishmentService from '@/services/hr/employee/PunishmentService'
import FrontendService from '@/services/FrontendService'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'EditPunishment',
  data () {
    return {
      form: {
        session_id: '',
        employee_id: '',
        regiment_id: '',
        submit_date: '',
        voucher_no: '',
        details:'',
        title:'',
        month: '',
      },
      session: '',
      months: '',
      employees:'',
      regiment:'',
      auth: ''
    }
  },
  mounted(){
    this.auth = VueJwtDecode.decode(localStorage.getItem("token"))
    if(this.auth.regiment_id && this.auth.regiment_id!==''){
      this.form.regiment_id = this.auth.regiment_id
    }
    this.getData()
  },
  components: {
    'editor': Editor // <- Important part
  },
  methods: {
    async getData () {
      const response = await PunishmentService.edit({
        id: this.$route.params.id
      })
      this.form = response.data
      this.form.id = this.$route.params.id
      this.photo= response.data.photo
      let ses = await PunishmentService.session()
      this.session = ses.data
      let reg = await FrontendService.regiment()
      this.regiment = reg.data
      this.months = { "1":"January", "2":"February", "3":"March", "4":"April", "5":"May", "6":"June",
        "7":"July", "8":"August", "9":"September", "10":"October", "11":"November", "12":"December" };
      this.getEmployee()
    },
    async getEmployee(){
      let employee = await PunishmentService.employee(this.form.regiment_id)
      this.employees = employee.data
    },

    async update () {
      await PunishmentService.update(this.form)
        .then(success => {
            this.getData()
            this.$swal({
              type: 'success',
              title: 'Data Successfully Update',
              showConfirmButton: false,
              timer: 1500
            })
        })
        .catch(err => {
          this.$swal({
            type: 'warning',
            title: err.response.data,
            showConfirmButton: true,
          })
        })
    }
  }
}
</script>
<style></style>
