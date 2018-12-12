<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
           Budget Distribution {{myData.session.name}}
            <div class="card-btn pull-right">
              <router-link tag="a" to="/budget" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <form id="form" @submit.prevent="store">
              <input type="hidden" name="budget_id" :value="myData._id">
            <div class="form-group row">
              <div class="col-md-12 no-padding">
                <div class="table-responsive">
                  <table class="table table-bordered min-padding-table th-center">
                    <tr class="active" style="background: #c3ddfa">
                      <th width="5%">E. Code</th>
                      <th width="14%">Description</th>
                      <th v-for="(reg, ind) in regiments" :key="ind" width="10%"> {{reg.short_name}}<br> <small> {{reg.code}} </small> </th>
                      <th width="5%"> Total </th>
                    </tr>
                    <tr  v-for="(head, index) in heads" :key="index">
                      <td> {{head.code}} </td>
                      <td> {{head.name}}</td>
                      <td  v-for="(reg, ind) in regiments" :key="ind"><input type="number" @blur="silentStore" v-model="form.head_value[index].regiment[ind].amount" value="0" min="0" placeholder="" required class="form-control min-height"></td>
                      <td> {{head.amount}} </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
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
import BudgetService from '@/services/acc/budget/BudgetService'
import DistributionService from '@/services/acc/budget/DistributionService'
export default {
  name: 'BudgetDistribute',
  data () {
    return {
      form: {
        budget_id: '',
        head_value: {},
        distribution_status: 1
      },
      myData: {
        session: {}
      },
      heads: [],
      regiments: ''
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    restAmount:function(){
      return 0
    }
  },
  methods: {
    async getData(){
      const response = await BudgetService.show({
        id: this.$route.params.id
      })
      let distributions = await DistributionService.show({ id: this.$route.params.id })
      let distribution = distributions.data.allData
      this.myData = response.data
      this.form.budget_id = this.$route.params.id
      let headValue = await BudgetService.headValue({
        id: this.$route.params.id
      })
      this.heads = headValue.data
      this.regiments = distributions.data.regiments
      let i,j
      let newHead = {}
      let headCount = Object.keys(distribution).length;
      if(headCount>0){
        newHead = distribution
      }else{
        for (i=0; i < this.heads.length; i++) {
          newHead[i] ={ head_id:this.heads[i].head_id, regiment:[] }
          for (j=0; j < this.regiments.length; j++) {
            newHead[i].regiment[j] ={ regiment_id:this.regiments[j]._id, amount: 0 }
          }
        }
      }

      this.form.head_value = newHead


    },
    async store () {
      await DistributionService.store(this.form)
        .then(res => {
          console.log(res.data)
          this.$swal({
            type: 'success',
            title: 'Data Successfully Saved',
            showConfirmButton: false,
            timer: 1500
          })
          //this.$router.push({path: '/budget'})
        })
        .catch(err => {
          console.log(err)
        })
    },
    async silentStore () {
      this.form.distribution_status = 2
      await DistributionService.store(this.form)
    }
  }
}
</script>
<style></style>
