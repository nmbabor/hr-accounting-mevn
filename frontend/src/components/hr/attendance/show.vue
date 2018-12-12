<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Employee Attendance List
            <div class="card-btn pull-right">
              <button class="btn btn-sm btn-primary" v-print="'#printThis'"><i class="fa fa-print"></i> Print</button>
              <router-link tag="a" to="/attendance" class="btn btn-success btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12" id="printThis">
                <div class="table-responsives">
                  <div class="text-center">
                    <print-header></print-header>
                    <br>
                  </div>
                  <div class="row">
                    <div class="col-md-5">
                      <table class="table table-bordered">
                        <tr>
                          <th class="text-right" width="20%"> Division : </th>
                          <td> {{info.regiment_name}} </td>
                        </tr>
                        <tr>
                          <th class="text-right" width="20%"> Code : </th>
                          <td> {{info.regiment_code}} </td>
                        </tr>
                        <tr>
                          <th class="text-right" width="20%"> Date: </th>
                          <td> {{info.attendance_date}}  </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <table class="table table-bordered" id="autoIncrement">
                        <thead>
                        <tr>
                          <th width="5%">SL</th>
                          <th width="15%">ID</th>
                          <th width="15%">Employee Name </th>
                          <th width="15%"> Designation </th>
                          <th width="15%"> Day Status </th>
                          <th width="12%"> In Time </th>
                          <th width="12%"> Out Time </th>
                          <th width="5%">Attendance</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(data,i) in allData" :key="i">
                          <td>{{i+1}}</td>

                          <td>{{data.employee.personal_id}}</td>
                          <td>{{data.employee.name_english}}</td>
                          <td>{{data.employee.designation}}</td>
                          <td><span v-if="data.day_status===1"> Working Day </span><span v-else=""> Off Day </span></td>
                          <td>{{new Date(data.in_time).toLocaleTimeString()}}</td>
                          <td>{{new Date(data.out_time).toLocaleTimeString()}}</td>
                          <td>
                            <span v-if="data.attendance===1"> Present </span>
                            <span v-if="data.attendance===2"> Leave </span>
                            <span v-else=""> Absent </span>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <br>
                  <br>
                  <div class="row">
                    <div class="col-md-4 text-center" style="width: 33%;float: left;">
                      <p>----------------------------<br>Prepared By</p>
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
import AttendanceService from '@/services/hr/AttendanceService'
  export default {
    name: 'ShowAttendance',
    data () {
      return {
        allData: [],
        info:{}
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

        const response = await AttendanceService.show(this.$route.query)
        this.allData = response.data.attendance
        this.info = response.data.info

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
