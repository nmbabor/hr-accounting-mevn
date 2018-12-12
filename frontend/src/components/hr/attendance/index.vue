<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/attendance/create" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>

            </div>
            <h4 class="card-title">View All Attendance </h4>
          </div>
          <div class="card-body table-responsive">
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Date</th>
                <th>Division</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData" :key="index">
                <td>{{index+1}}</td>
                <td>{{data.attendance_date.slice(0,10)}}</td>
                <td>{{data.regiment.name}}</td>
                <td>
                  <router-link tag="a" v-bind:to="'attendance/show?reg='+data.regiment_id+'&date='+data.attendance_date.slice(0,10)" title="Show for print" class="btn btn-xs btn-success"><i class="fa fa-eye"></i></router-link>
                  <router-link tag="a" v-bind:to="'attendance/edit?reg='+data.regiment_id+'&date='+data.attendance_date.slice(0,10)" title="Show for print" class="btn btn-xs btn-info"><i class="fa fa-edit"></i></router-link>

                </td>
                <td> <button class="btn btn-xs btn-danger" @click="deleteData({regiment_id:data.regiment_id,attendance_date:data.attendance_date})"> <i class="fa fa-trash"></i> </button> </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import AttendanceService from '@/services/hr/AttendanceService'
export default {
  name: 'Attendance',
  data () {
    return {
      allData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const response = await AttendanceService.index()
      this.allData = response.data
    },
    async deleteData (params) {
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
          AttendanceService.destroy(params).then(res=>{
            $this.getData()
          }).catch(er=>{
            console.log(er)
          })
        }
      })
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
