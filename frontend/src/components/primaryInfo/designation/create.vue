<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Create New Designation
            <div class="card-btn pull-right">
              <router-link tag="a" to="/designation" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <form method="POST">
              <div class="form-group row  ">
                <label class="col-md-3 control-label">Designation</label>
                <div class="col-md-8">
                  <input type="text" v-model="form.designation" class="form-control" placeholder="Name of designation" value="">
                </div>
              </div>
              <div class="form-group row  ">
                <label class="col-md-3 control-label">Details</label>
                <div class="col-md-8">
                  <textarea v-model="form.details" class="form-control" placeholder="Details about designation"></textarea>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-3"></div>
                <div class="col-md-9">
                  <button type="button" @click="store" class="btn btn-primary">Submit</button>
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
import DesignationService from '@/services/DesignationService'
export default {
  name: 'designation',
  data () {
    return {
      form: {
        designation: '',
        details: ''
      }
    }
  },
  methods: {
    async store () {
      console.log(this.form)
      await DesignationService.store(this.form)
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Data Successfully Saved',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style></style>
