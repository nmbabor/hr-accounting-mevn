<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Edit Budget
            <div class="card-btn pull-right">
              <button class="btn btn-sm btn-primary" v-print="'#printThis'"><i class="fa fa-print"></i> Print</button>
              <router-link tag="a" to="/budget" class="btn btn-success btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body"  id="printThis">
            <div class="text-center">
              <h6> Bangladesh National Cadet Corps -11910 </h6>
              <span> <b> Budget {{form.session.name}} </b></span><br>
              <span> Budget Date:  {{form.budget_date.slice(0,10)}} </span><br>
              <span> Total Budget Amount:  {{form.amount}} </span>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered min-padding-table">
                <tr>
                  <th width="10%">E. Code</th>
                  <th>Description</th>
                  <th width="40%">Amount</th>
                </tr>
                <tr  v-for="(head, index) in heads" :key="index">
                  <td> {{head.code}} </td>
                  <td> {{head.name}}</td>
                  <td><span> {{form.head_value[index].amount}} </span></td>
                </tr>
              </table>
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
    name: 'BudgetAdd',
    data () {
      return {
        form: {
          session_id: '',
          budget_date: new Date().toJSON().slice(0,10),
          amount: 0,
          head_value: [],
          id: '',
          session: {}
        },
        heads: [],
        devideHead: 28,
        session: '',
        session_name: '',
        total: 0
      }
    },
    mounted () {
      this.getData(),
        this.totalAmount()
    },
    computed: {
      restAmount: function () {
        return this.form.amount
      }
    },
    methods: {
      async getData(){
        const response = await BudgetService.show({
          id: this.$route.params.id
        })
        this.form = response.data
        this.form.id = this.$route.params.id
        let headValue = await BudgetService.headValue({
          id: this.$route.params.id
        })
        // let head = await BudgetService.heads()
        this.heads = headValue.data
        let i = 0
        let newHead = []
        for (i=0; i < this.heads.length; i++) {
          newHead.push({head_id:this.heads[i].head_id, amount: this.heads[i].amount})
        }
        this.form.head_value = newHead
        let ses = await BudgetService.session()
        this.session = ses.data
      },

      totalAmount(){
        let ta = 0
        let i = 0
        for (i=0; i < this.heads.length; i++) {
          ta = ta + parseInt(this.form.head_value[i].amount)
        }
        this.total = ta
      }
    }
  }
</script>
<style>
  .table.min-padding-table td, .table.min-padding-table th {
    font-size: 13px;
  }
  @page { size: landscape; }
</style>
