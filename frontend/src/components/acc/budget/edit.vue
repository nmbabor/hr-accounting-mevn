<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            <i class="fa fa-edit"></i> Edit Budget
            <div class="card-btn pull-right">
              <router-link tag="a" to="/budget" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="form-group row  ">
              <label for="session_id" class="col-md-3 control-label"> Budget Session </label>
              <div class="col-md-8">
                <select id="session_id" required class="form-control" v-model="form.session_id">
                  <option value="" selected> -select- </option>
                  <option v-for="(ses, indx) in session" :key="indx" :value="ses._id"> {{ses.name}} </option>
                </select>
              </div>
            </div>
            <div class="form-group row  ">
              <label for="head_id" class="col-md-3 control-label"> Budget Head </label>
              <div class="col-md-8">
                <select id="head_id" required class="form-control" v-model="form.head_id">
                  <option value="" selected> -select- </option>
                  <option v-for="(head, ind) in heads" :key="ind" :value="head._id"> {{head.name}} </option>
                </select>
              </div>
            </div>
            <div class="form-group row  ">
              <label class="col-md-3 control-label">Budget Date</label>
              <div class="col-md-8">
                <datetime type="date" format="dd-MM-yyyy" input-class="form-control"  placeholder="Select Date" required v-model="form.budget_date"></datetime>
              </div>
            </div>
            <div class="form-group row  ">
              <label for="amount" class="col-md-3 control-label">Budget Amount</label>
              <div class="col-md-8">
                <input type="number" min="0" v-model="form.amount" class="form-control" placeholder="Budget Amount" id="amount">
              </div>
            </div>
            <div class="form-group row" v-if="form.status!=2">
              <label for="status" class="col-md-3 control-label">Status</label>
              <div class="col-md-8">
                <select id="status" class="form-control" v-model="form.status" required>
                  <option value="1" > Active </option>
                  <option value="0"> Inactive </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-3"></div>
              <div class="col-md-9">
                <button type="submit" @click="update" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BudgetService from '@/services/acc/budget/BudgetService'
export default {
  name: 'BudgetEdit',
  data () {
    return {
      form: {
        head_id: '',
        session_id: '',
        budget_date: new Date().toJSON().slice(0,10),
        amount: '',
        id: ''
      },
      heads: '',
      session: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const response = await BudgetService.show({
        id: this.$route.params.id
      })
      this.form = response.data
      this.form.id = this.$route.params.id
      let head = await BudgetService.heads()
      this.heads = head.data
      let ses = await BudgetService.session()
      this.session = ses.data
    },

    async update () {
      await BudgetService.update(this.form)
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Data Successfully Update',
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
