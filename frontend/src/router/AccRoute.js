export default [
  {path: '/budget-head', name: 'budgetHead', meta: {parent: 'Budget', subparent: 'Budget Settings', submenu: 'true', breadcrumb: 'Settings', breadcrumb2: 'Budget Head'}, component: require('@/components/acc/budget/Head').default},

  {path: '/budget', name: 'budget', meta: {parent: 'Budget', submenu: 'true', breadcrumb: 'Add Budget',breadcrumb2: 'All Budget'}, component: require('@/components/acc/budget/budget/index').default},

  {path: '/budget/create', name: 'budgetCreate', meta: {parent: 'Budget', submenu: 'false', breadcrumb: 'Add Budget',breadcrumb2: 'Create'}, component: require('@/components/acc/budget/budget/create').default},

  {path: '/budget/:id/edit', name: 'budgetEdit', meta: {parent: 'Budget', submenu: 'false', breadcrumb: 'Add budget',breadcrumb2: 'Edit'}, component: require('@/components/acc/budget/budget/edit').default},
  {path: '/budget/:id', name: 'budgetShow', meta: {parent: 'Budget', submenu: 'false', breadcrumb: 'Add budget',breadcrumb2: 'Show'}, component: require('@/components/acc/budget/budget/Show').default},

  {path: '/budget-session', name: 'budgetSession', meta: {parent: 'Budget', subparent: 'Budget Settings', submenu: 'true', breadcrumb: 'Settings', breadcrumb2: 'Session'}, component: require('@/components/acc/budget/Session').default},

  {path: '/budget-distribution/:id/create', name: 'budgetDistributionCreate', meta: {parent: 'Budget', submenu: 'false', breadcrumb: 'Budget Distribution',breadcrumb2: 'Create'}, component: require('@/components/acc/budget/distribution/create').default},

  {path: '/budget-distribution/:id', name: 'budgetDistributionShow', meta: {parent: 'Budget', submenu: 'false', breadcrumb: 'Budget Distribution',breadcrumb2: 'Show'}, component: require('@/components/acc/budget/distribution/show').default},
  {path: '/budget-find', name: 'budgetFind', meta: {parent: 'Budget', submenu: 'false', breadcrumb: 'Budget Find',breadcrumb2: 'null'}, component: require('@/components/acc/budget/findBudget/Find').default},

  {path: '/ntr', name: 'ntr', meta: {parent: 'NTR', submenu: 'true', breadcrumb: 'Add',breadcrumb2: 'All NTR'}, component: require('@/components/acc/ntr/index').default},

  {path: '/ntr/create', name: 'ntrCreate', meta: {parent: 'NTR', submenu: 'false', breadcrumb: 'Add NTR',breadcrumb2: 'Create'}, component: require('@/components/acc/ntr/create').default},

  {path: '/ntr/:id/edit', name: 'ntrEdit', meta: {parent: 'NTR', submenu: 'false', breadcrumb: 'Edit ntr',breadcrumb2: 'Edit'}, component: require('@/components/acc/ntr/edit').default},
  {path: '/ntr-find', name: 'ntrFind', meta: {parent: 'Ntr', submenu: 'false', breadcrumb: 'Ntr Find',breadcrumb2: 'null'}, component: require('@/components/acc/ntr/find/NtrFind').default},

  {path: '/welfare', name: 'welfare', meta: {parent: 'Welfare', submenu: 'true', breadcrumb: 'Add',breadcrumb2: 'All Welfare'}, component: require('@/components/acc/welfare/index').default},

  {path: '/welfare/create', name: 'welfareCreate', meta: {parent: 'Welfare', submenu: 'false', breadcrumb: 'Add Welfare',breadcrumb2: 'Create'}, component: require('@/components/acc/welfare/create').default},

  {path: '/welfare/:id/edit', name: 'welfareEdit', meta: {parent: 'Welfare', submenu: 'false', breadcrumb: 'Edit welfare',breadcrumb2: 'Edit'}, component: require('@/components/acc/welfare/edit').default},
  {path: '/welfare-find', name: 'welfareFind', meta: {parent: 'Welfare', submenu: 'false', breadcrumb: 'Welfare Find',breadcrumb2: 'null'}, component: require('@/components/acc/welfare/find/Find').default},

  {path: '/expenditure', name: 'expenditure', meta: {parent: 'Expenditure', submenu: 'true', breadcrumb: 'Add',breadcrumb2: 'All Expenditure'}, component: require('@/components/acc/expenditure/Index').default},

  {path: '/expenditure/create', name: 'expenditureCreate', meta: {parent: 'Expenditure', submenu: 'false', breadcrumb: 'Add Expenditure',breadcrumb2: 'Create'}, component: require('@/components/acc/expenditure/Create').default},

  {path: '/expenditure/:id/edit', name: 'expenditureEdit', meta: {parent: 'Expenditure', submenu: 'false', breadcrumb: 'Edit expenditure',breadcrumb2: 'Edit'}, component: require('@/components/acc/expenditure/Edit').default},
  {path: '/bank-book', name: 'bankBook', meta: {parent: 'Bank Book', submenu: 'true', breadcrumb: 'All',breadcrumb2: 'Bank Book'}, component: require('@/components/acc/bankBook/Index').default},
  {path: '/bank-book/:id', name: 'bankBookShow', meta: {parent: 'Bank Book', submenu: 'true', breadcrumb: 'Show',breadcrumb2: 'Bank Book'}, component: require('@/components/acc/bankBook/Show').default},

  {path: '/bank-withdraw', name: 'bankWithdraw', meta: {parent: 'Bank Book', submenu: 'true', breadcrumb: 'Withdraw',breadcrumb2: 'All'}, component: require('@/components/acc/bankBook/withdraw/Index').default},

  {path: '/bank-withdraw/create', name: 'bankWithdrawCreate', meta: {parent: 'Bank Book', submenu: 'false', breadcrumb: 'Add Bank Book',breadcrumb2: 'Create'}, component: require('@/components/acc/bankBook/withdraw/Create').default},

  {path: '/bank-withdraw/:id/edit', name: 'bankWithdrawEdit', meta: {parent: 'Bank Book', submenu: 'false', breadcrumb: 'Edit bankWithdraw',breadcrumb2: 'Edit'}, component: require('@/components/acc/bankBook/withdraw/Edit').default},
  {path: '/bank-withdraw/:id', name: 'bankWithdrawShow', meta: {parent: 'Bank Book', submenu: 'false', breadcrumb: 'Show bankWithdraw',breadcrumb2: 'Show'}, component: require('@/components/acc/bankBook/withdraw/Show').default},
  {path: '/welfare-expenditure', name: 'welfareExpenditure', meta: {parent: 'Expenditure', submenu: 'true', breadcrumb: 'welfare',breadcrumb2: 'All'}, component: require('@/components/acc/welfare/expenditure/Index').default},

  {path: '/welfare-expenditure/create', name: 'welfareExpenditureCreate', meta: {parent: 'Expenditure', submenu: 'false', breadcrumb: 'Add Expenditure',breadcrumb2: 'Create'}, component: require('@/components/acc/welfare/expenditure/Create').default},

  {path: '/welfare-expenditure/:id/edit', name: 'welfareExpenditureEdit', meta: {parent: 'Expenditure', submenu: 'false', breadcrumb: 'Edit Welfare Expenditure',breadcrumb2: 'Edit'}, component: require('@/components/acc/welfare/expenditure/Edit').default},

  {path: '/reports/budget', name: 'reportBudget', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Total Budget',breadcrumb2: 'null'}, component: require('@/components/acc/reports/BudgetReport').default},
  {path: '/reports/budget-distribute', name: 'reportBudgetDistribute', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Budget Distribute',breadcrumb2: 'null'}, component: require('@/components/acc/reports/RegWiseBudget').default},
  {path: '/reports/budget-distribute/:id', name: 'reportDistribute', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Budget Distribute',breadcrumb2: 'null'}, component: require('@/components/acc/reports/RegWiseBudget').default},
  {path: '/reports/expenditure', name: 'reportExpenditure', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Total Expenditure',breadcrumb2: 'null'}, component: require('@/components/acc/reports/Expenditure').default},
  {path: '/reports/reg-expenditure', name: 'reportRegExpenditure', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Budget Expenditure',breadcrumb2: 'null'}, component: require('@/components/acc/reports/RegExpenditure').default},
  {path: '/reports/reg-expenditure/:id', name: 'reportHqExpenditure', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Budget Expenditure',breadcrumb2: 'null'}, component: require('@/components/acc/reports/RegExpenditure').default},
  {path: '/reports/welfare', name: 'reportWelfare', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Welfare Fund',breadcrumb2: 'null'}, component: require('@/components/acc/reports/Welfare').default},
  {path: '/reports/welfare/:id', name: 'reportHqWelfare', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Welfare Fund',breadcrumb2: 'null'}, component: require('@/components/acc/reports/Welfare').default},
  {path: '/reports/welfare-expenditure', name: 'reportWelfareExpenditure', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Welfare Expenditure',breadcrumb2: 'null'}, component: require('@/components/acc/reports/WelfareExpenditure').default},
  {path: '/reports/welfare-expenditure/:id', name: 'reportHqWelfareExpenditure', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Welfare Expenditure',breadcrumb2: 'null'}, component: require('@/components/acc/reports/WelfareExpenditure').default},
  {path: '/reports/ntr', name: 'reportNtr', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'NTR Total',breadcrumb2: 'null'}, component: require('@/components/acc/reports/NtrTotal').default},

  {path: '/reports/ntr-deposit', name: 'reportNtrDeposit', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Ntr Deposit',breadcrumb2: 'null'}, component: require('@/components/acc/reports/NtrReg').default},
  {path: '/reports/ntr-deposit/:id', name: 'reportHqNtrDeposit', meta: {parent: 'Accounting Report', submenu: 'false', breadcrumb: 'Ntr Deposit',breadcrumb2: 'null'}, component: require('@/components/acc/reports/NtrReg').default},



]
