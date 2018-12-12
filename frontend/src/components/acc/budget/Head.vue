<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">

            </div>
            <h4 class="card-title"> Budget Heads </h4>
          </div>
          <div class="card-body table-responsive">
            <div class="row">
              <div class="col-md-10">
                <div class="row">
                  <label class="col-md-3">Head Name : </label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" required v-model="form.name" placeholder="Head Name">
                    <br>
                  </div>
                </div>
                <div class="row">
                  <label class="col-md-3"> Economic Code : </label>
                  <div class="col-md-5">
                    <input type="number" min="0" class="form-control" required v-model="form.code" placeholder="Economic Code">
                  </div>
                  <div class="col-md-2">
                    <select class="form-control" v-model="form.type">
                      <option value="0"> Cheque </option>
                      <option value="1"> EFT </option>
                    </select>
                  </div>
                  <div class="col-md-2">
                    <button class="btn btn-sm btn-success" @click="store"> <i class="fa fa-save"></i> Save </button>
                  </div>
                </div>
              </div>

            </div>
            <br>
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th width="20%">Economic Code</th>
                <th>Name</th>
                <th>Transaction Type</th>
                <th width="3%">Status</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData" :key="index">
                <td>{{index+1}}</td>
                <td>{{data.code}}</td>
                <td>{{data.name}}</td>
                <td> <span v-if="data.type==1"> EFT </span> <span v-if="data.type==0"> Cheque </span> </td>
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
                          <h4 class="modal-title" id="myModalLabel">Edit Budget Head</h4>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                          <label> Name: </label>
                          <input type="text" class="form-control" required v-model="data.name">
                          <label> Economic Code: </label>
                          <input type="text" class="form-control" required v-model="data.code">
                          <label> Transaction Type: </label>
                          <select class="form-control" v-model="data.type">
                            <option value="0"> Cheque </option>
                            <option value="1"> EFT </option>
                          </select>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateData(data,index)" >Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div> </td>
                <td> <button class="btn btn-xs btn-danger" @click="deleteData(data._id, index)"><i class="fa fa-trash"></i></button></td>
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
import service from '@/services/acc/budget/HeadService'
export default {
  name: 'BudgetHead',
  data () {
    return {
      form: {
        name: '',
        code: '',
        type: 0
      },
      allData: [],
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
        await service.store(this.form).then(res => {
          this.allData.push(res.data.result)
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
        this.$router.push({ name: 'budgetHead' })
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
      }
    }
  }
</script>
<style></style>
