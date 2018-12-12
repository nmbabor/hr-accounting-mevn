<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">

            </div>
            <h4 class="card-title">View All Budget Session </h4>
          </div>
          <div class="card-body table-responsive">
            <div class="row">
              <div class="col-md-10">
                <div class="row">
                  <label class="col-md-3"> Session : </label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" required v-model="name" placeholder="Session Year">
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <button class="btn btn-sm btn-success" @click="store"> <i class="fa fa-save"></i> Save </button>
              </div>
            </div>
            <br>
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Session</th>
                <th width="10%">Active</th>
                <th width="5%">Status</th>
                <th colspan="2" width="8%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData" :key="index">
                <td>{{index+1}}</td>
                <td>{{data.name}}</td>
                <td><b v-if="data.active==1" class="text-success"> Active </b>
                  <span v-else><button type="button" class="btn btn-xs btn-danger" @click="makeActive(data._id)"> Make It Active </button></span></td>
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
                          <h4 class="modal-title" id="myModalLabel">Edit Session</h4>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                          <input type="text" class="form-control" required v-model="data.name">
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateData(data,index)" >Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div> </td>
                <td> <button v-if="1>2" class="btn btn-xs btn-danger" @click="deleteData(data._id, index)"><i class="fa fa-trash"></i></button> <i v-else="" class="fa fa-trash"></i></td>
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
import service from '@/services/acc/budget/SessionService'
  export default {
    name: 'BudgetSession',
    data () {
      return {
        name: '',
        allData: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        const response = await service.index()
        this.allData = response.data
      },
      async store () {
        await service.store({
          name: this.name
        }).then(res => {
          this.allData.push(res.data.result)
          this.name = ''
          this.$swal({
            type: 'success',
            title: 'Data Successfully Added',
            showConfirmButton: false,
            timer: 1500
          })
        })
      },
      async updateData (form, i) {
        await service.update(form)
        this.$swal({
          type: 'success',
          title: 'Data Successfully Updated',
          showConfirmButton: false,
          timer: 1500
        })
        this.$router.push({ name: 'budgetSession' })
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
            service.delete(id)
            $this.allData.splice(index, 1)
          }
        })
      },
      async makeActive(id){
        service.active(id).then(res => {
          this.getData()
        })
      }
    }
  }
</script>
<style></style>
