<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Head Wise Total Budget Expenditure
            <div class="card-btn pull-right">
              <button class="btn btn-sm btn-primary" v-print="'#printThis'"><i class="fa fa-print"></i> Print</button>
            </div>
          </div>
          <div class="card-body"  id="printThis">
            <div class="text-center">
              <h6> Bangladesh National Cadet Corps -11910 </h6>
              <span> <b> Budget Expenditure of {{allData.session.name}} </b></span><br>
              <span> Budget Date:  {{allData.budget_date}} </span><br>
              <span> Total Budget Amount:  {{allData.amount}} </span>
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
                  <td><span> {{head.amount}} </span></td>
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
  import BudgetReportsService from '@/services/acc/reports/BudgetReportsService'
  export default {
    name: 'BudgetExpenditureReport',
    data () {
      return {
        allData: {
          session: {},
        },
        heads: [],
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData(){
        const response = await BudgetReportsService.expenditure()
        this.allData = response.data.budget
        this.allData.budget_date = this.allData.budget_date.slice(0,10)
        this.heads = response.data.heads
      },
    }
  }
</script>
<style>
  .table.min-padding-table td, .table.min-padding-table th {
    font-size: 13px;
  }
  @page { size: landscape; }
</style>
