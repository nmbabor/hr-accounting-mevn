<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/designation/create" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>
            </div>
            <h4 class="card-title">View All Designation </h4>
          </div>
          <div class="card-body table-responsive">
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Designation</th>
                <th>Details</th>
                <th>Status</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(designation, index) in Designations" :key="index">
                <td>{{++index}}</td>
                <td>{{designation.designation}}</td>
                <td>{{designation.details}}</td>
                <td>
                  <i v-if="designation.status==1" class="fa fa-check-circle text-success"></i>
                  <i class="fa fa-check-circle text-success" v-else></i>
                </td>

                <td>
                  <router-link v-bind:to="{ name: 'editDesignation', params: { id: designation._id } }" class="btn btn-xs btn-warning"><i class="fa fa-edit"></i></router-link>
                  <button class="btn btn-xs btn-danger" @click="deleteDesignation(designation._id, index)"> <i class="fa fa-trash"></i> </button>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="pull-right">
            </div>
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
      Designations: []
    }
  },
  mounted () {
    this.getDesignation()
  },
  methods: {
    async getDesignation () {
      const response = await DesignationService.allDesignation()
      this.Designations = response.data
    },
    async deleteDesignation (id, index) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value) {
          DesignationService.destroy(id)
          $this.Designations.splice(index, 1)
        }
      })
    }
  }
}
</script>
<style></style>
