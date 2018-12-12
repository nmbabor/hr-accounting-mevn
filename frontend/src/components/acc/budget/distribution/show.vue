<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Budget Distribution {{myData.session.name}}
            <div class="card-btn pull-right">
              <download-excel
                class   = "btn btn-sm btn-success"
                :data   = "json_data"
                :fields = "json_fields"
                name    = "excelFileName">
                <i class="fa fa-file-excel-o"></i> Excel
              </download-excel>
              <button class="btn btn-sm btn-primary" v-print="'#printThis'"><i class="fa fa-print"></i> Print</button>
              <router-link v-if="myData.distribution_status!=3" tag="a" v-bind:to="{ name: 'budgetDistributionCreate', params: { id: myData._id } }" class="btn btn-sm btn-warning"> <i class="fa fa-edit"></i> Edit </router-link>
              <router-link tag="a" to="/budget" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
              <div class="form-group row">
                <div class="col-md-12 no-padding">
                  <div class="table-responsive" id="printThis">
                    <table class="table table-bordered min-padding-table th-center">
                      <tr class="active" style="background: #c3ddfa">
                        <th width="5%">E. Code</th>
                        <th width="14%">Description</th>
                        <th v-for="(reg, ind) in regiments" :key="ind" width="10%"> {{reg.short_name}}<br> <small> {{reg.code}} </small> </th>
                        <th width="5%"> Total </th>
                      </tr>
                      <tr  v-for="(head, index) in allData" :key="index">
                        <td> {{head.code}} </td>
                        <td> {{head.name}}</td>
                        <td  v-for="(reg, ind) in head.regiment" :key="ind"> {{reg.amount}}</td>
                        <td> {{head.amount}} </td>
                      </tr>
                    </table>
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
  import BudgetService from '@/services/acc/budget/BudgetService'
  import DistributionService from '@/services/acc/budget/DistributionService'
  export default {
    name: 'BudgetDistributionShow',
    data () {
      return {
        allData: '',
        myData: {
          session: {}
        },
        regiments: '',
        json_fields: {},
        json_data: [],
        json_meta: [
          [
            {
              'key': 'charset',
              'value': 'utf-8'
            }
          ]
        ],
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData(){
        const response = await BudgetService.show({
          id: this.$route.params.id
        })
        let distributions = await DistributionService.show({ id: this.$route.params.id })
        let distribution = distributions.data.allData
        this.myData = response.data
        this.allData = distribution
        this.regiments = distributions.data.regiments
        let i;
        let preHead = {
          'Economic Code': 'code',
          'Description': 'name'
        }
        let regLength = Object.keys(this.regiments).length
        let regiHead = {}
        for(i=0;i<regLength;i++){
          let regName = this.regiments[i].name
          regiHead[regName]="regiment."+i
        }

        this.json_fields =  Object.assign({},preHead,regiHead,{"Total":"amount"})

        let dataLength = Object.keys(distribution).length
        let jsonData = []
        let j=0
        for(i=0;i<dataLength;i++){
          let regLength = Object.keys(distribution[i].regiment).length
          let regAmount = []
          for(j=0;j<regLength;j++){
            regAmount.push(distribution[i].regiment[j].amount)
          }
          jsonData.push({
            name: distribution[i].name,
            amount: distribution[i].amount,
            code: distribution[i].code,
            regiment: regAmount
          })
        }
        this.json_data = jsonData
        console.clear()
      }
    }
  }
</script>
<style>
  .table.min-padding-table td, .table.min-padding-table th {
    font-size: 13px;
    page-break-inside: avoid;
  }
  @page { size: landscape; }

</style>
