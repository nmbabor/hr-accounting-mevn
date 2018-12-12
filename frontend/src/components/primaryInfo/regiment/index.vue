<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">

            </div>
            <h4 class="card-title">View All Division </h4>
          </div>
          <div class="card-body table-responsive">
            <form @submit.prevent="store" method="POST">
            <div class="row">
              <div class="col-md-10">
                <div class="row">
                  <label class="col-md-3"> Division Name : </label>
                  <div class="col-md-6">
                    <input type="text" class="form-control" required v-model="form.name" placeholder="Division Name">
                    <br>
                  </div>
                  <div class="col-md-3">
                    <select class="form-control" required v-model="form.type">
                      <option value=""> -select type- </option>
                      <option value="regiment"> Regiment </option>
                      <option value="flotilla"> Flotilla </option>
                      <option value="squadron"> Squadron </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <label class="col-md-3"> Code &amp; Short Name: </label>
                  <div class="col-md-8">
                    <div class="row">
                      <div class="col-md-4 no-padding">
                        <input type="text" class="form-control" v-model="form.code" placeholder="Code">
                      </div>
                      <div class="col-md-6">
                        <input type="text" class="form-control" required v-model="form.short_name" placeholder="Short Name">
                      </div>
                      <div class="col-md-2 no-padding-left">
                        <input type="number" min="0" class="form-control" required v-model="form.serial_num" placeholder="SL">
                      </div>
                    </div>

                  </div>
                  <div class="col-md-1 no-padding">
                    <button class="btn btn-sm btn-success"> <i class="fa fa-save"></i> Save </button>
                  </div>
                </div>
              </div>
            </div>
            </form>
            <br>
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th width="20%">Code</th>
                <th>Name</th>
                <th>Short Name</th>
                <th width="3%">Status</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData" :key="index">
                <td>{{data.serial_num}}</td>
                <td>{{data.code}}</td>
                <td>{{data.name}}</td>
                <td>{{data.short_name}}</td>
                <td><i v-if="data.status==1" class="fa fa-check-circle text-success"></i>
                  <i class="fa fa-times-circle-o text-danger"  v-else></i></td>
                <td><!-- Button trigger modal -->
                  <button type="button" class="btn btn-primary btn-xs" data-toggle="modal" :data-target="['#myModal'+data._id]">
                    <i class="fa fa-edit"></i>
                  </button>
                  <!-- Modal -->
                  <div class="modal fade" :id="['myModal'+data._id]" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title" id="myModalLabel">Edit Division</h4>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                          <label> Name : </label>
                          <input type="text" class="form-control" required v-model="data.name">
                          <label> Type : </label>
                          <select class="form-control" required v-model="data.type">
                            <option value=""> -select type- </option>
                            <option value="regiment"> Regiment </option>
                            <option value="flotilla"> Flotilla </option>
                            <option value="squadron"> Squadron </option>
                          </select>
                          <label> Short Name : </label>
                          <input type="text" class="form-control" required v-model="data.short_name">
                          <label> Code : </label>
                          <input type="text" class="form-control" required v-model="data.code">
                          <label> Serial Num : </label>
                          <input type="text" class="form-control" required v-model="data.serial_num">
                          <label> Status : </label>
                          <select class="form-control" v-model="data.status">
                            <option value="1"> Active </option>
                            <option value="0"> Inactive </option>
                          </select>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateData(data,index)" >Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div> </td>
                <td> <button class="btn btn-xs btn-danger displayNone" @click="deleteData(data._id, index)"><i class="fa fa-trash"></i></button></td>
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
import RegimentService from '@/services/RegimentService'
export default {
  name: 'Regiments',
  data () {
    return {
      form: {
        name: '',
        type: '',
        short_name: '',
        code: '',
        status: 1,
        serial_num: ''
      },
      allData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const response = await RegimentService.index()
      this.allData = response.data
      console.log(this.allData)
    },
    async store () {
      await RegimentService.store(this.form).then(res => {
        this.allData.push(res.data.result)
        this.form.name = ''
        this.form.short_name = ''
        this.form.code = ''
        this.form.serial_num = ''
        this.$swal({
          type: 'success',
          title: 'Data Successfully Added',
          showConfirmButton: false,
          timer: 1500
        })
      })
    },
    async updateData (form, i) {
      await RegimentService.update(form)
      this.$swal({
        type: 'success',
        title: 'Data Successfully Updated',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push({ name: 'regiments' })
    },
    async deleteData (id, index) {
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
          RegimentService.delete(id)
          $this.allData.splice(index, 1)
        }
      })
    }
  }
}
</script>
<style></style>
