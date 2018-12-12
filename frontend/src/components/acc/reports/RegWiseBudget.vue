<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <div  v-if="info != '' ">
                <download-excel
                  class   = "btn btn-xs btn-success"
                  :data   = "json_data"
                  :fields = "json_fields"
                  :name    = "excelFileName">
                  <i class="fa fa-file-excel-o"></i> Excel
                </download-excel>
                <button class="btn btn-xs btn-primary" v-print="'#printThis'"><i class="fa fa-print"></i> Print</button>
              </div>
            </div>
            <h4 class="card-title">Find Budget</h4>
          </div>
          <div class="card-body table-responsive">
            <div class="row">
              <div class="col-md-4">
                <div class="row">
                  <label for="regiment_id" class="col-md-12"> Division </label>
                  <div class="col-md-12">
                    <select id="regiment_id" @change="showData" required class="form-control" v-model="regiment_id">
                      <option value="" selected> -select- </option>
                      <option v-for="(reg, indx) in regiments" :key="indx" :value="reg._id"> {{reg.name}} </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <br>

            <div id="printThis">
              <div  v-if="info != '' ">
                <div class="text-center">
                  <print-header></print-header>
                  <h5><u> Budget Distribution {{info.session}} </u></h5>
                  <h6><u> {{info.regiment}} ({{info.code}}) </u></h6>
                </div>
                <div class="table-responsive">
                  <table id="datatable" class="table table-striped table-bordered">
                    <thead>
                    <tr>
                      <th width="5%">Economic Code</th>
                      <th> Description </th>
                      <th>Amount</th>
                      <th>Budget Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(data,index) in allData" :key="index">
                      <td>{{data.code}}</td>
                      <td>{{data.name}}</td>
                      <td>{{data.amount}}</td>
                      <td>{{data.budget_amount}}</td>
                    </tr>
                    </tbody>
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
  import PrintHeader from '@/components/pad/Header'
  import BudgetReportsService from '@/services/acc/reports/BudgetReportsService'
  export default {
    name: 'BudgetSession',
    data () {
      return {
        regiment_id:'',
        allData: [],
        info: '',
        excelFileName: '',
        session: '',
        regiments: '',
        json_fields: {
          'Economic Code': 'code',
          'Description': 'name',
          'Amount': 'amount',
          'Budget Amount': 'budget_amount',
        },
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
    components:{
      'print-header': PrintHeader
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        let regiment = await BudgetReportsService.regiments()
        this.regiments = regiment.data
        if(this.$route.params.id){
          this.regiment_id = this.$route.params.id
          this.showData()
        }
      },
      async showData() {
        const showResult = await BudgetReportsService.distribute(this.regiment_id)
        this.allData = showResult.data.budget
        this.info = showResult.data.info
        let i
        let newdata = []
        let headCount = Object.keys(this.allData).length;
        for(i=0;i<headCount;i++){
          newdata.push({
            name: this.allData[i].name,
            code: this.allData[i].code,
            amount: this.allData[i].amount,
            budget_amount: this.allData[i].budget_amount,
          })
        }
        this.json_data = newdata
        let a = this.info.session.replace(/ /g,"_").toLowerCase()
        let b = this.info.regiment.replace(/ /g,"_").toLowerCase()
        this.excelFileName = a+'_'+b+'.xls'
      }

    }
  }
</script>
<style></style>
