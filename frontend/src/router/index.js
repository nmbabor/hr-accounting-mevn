import Vue from 'vue'
import Router from 'vue-router'
import AccRoute from './AccRoute'
import HrRoute from './HrRoute'
import dashboard from '@/components/dashboard'
import login from '@/components/Login'
import userCreate from '@/components/PrimaryInfo/user/create'
import users from '@/components/PrimaryInfo/user/index'
import usersEdit from '@/components/PrimaryInfo/user/edit'
import moduleCreate from '@/components/PrimaryInfo/module/create'
import moduleEdit from '@/components/PrimaryInfo/module/edit'
import menuCreate from '@/components/PrimaryInfo/menu/create'
import menu from '@/components/PrimaryInfo/menu/index'
import menuEdit from '@/components/PrimaryInfo/menu/edit'
import subMenuCreate from '@/components/PrimaryInfo/subMenu/create'
import subMenu from '@/components/PrimaryInfo/subMenu/index'
import subMenuEdit from '@/components/PrimaryInfo/subMenu/edit'
import companyCreate from '@/components/PrimaryInfo/company/create'
import allCompany from '@/components/PrimaryInfo/company/index'
import companyEdit from '@/components/PrimaryInfo/company/edit'
import primaryInfo from '@/components/PrimaryInfo/primary-info/primary-info'
import createEmployee from '@/components/Employee/create'
import employeeEdit from '@/components/Employee/edit'
import employeesList from '@/components/Employee/index'
import employeeShow from '@/components/Employee/show'
import createDesignation from '@/components/PrimaryInfo/designation/create'
import alldesignation from '@/components/PrimaryInfo/designation/index'
import editDesignation from '@/components/PrimaryInfo/designation/edit'
import error404 from '@/components/error/404'
import error403 from '@/components/error/403'
import error500 from '@/components/error/500'
import error204 from '@/components/error/204'

Vue.use(Router)

const baseRoutes = [
    {path: '/login',name: 'login',meta: {layout: 'login'},component: login},
    {
      path: '/',name: 'dashboard', meta: {layout: 'main', parent: 'Dashboard', submenu: 'false', breadcrumb: 'null', breadcrumb2: 'null'},component: dashboard
    },
    {
      path: '/primary-info', name: 'primaryInfo',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Primary Info'},component: primaryInfo
    },
    {
      path: '/users/create', name: 'user-create', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Create User'}, component: userCreate
    },
    {
      path: '/users',name: 'users',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Users'}, component: users
    },
    {
      path: '/users/:id/edit',name: 'editUser',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit User'}, component: usersEdit
    },
    {
      path: '/module/create', name: 'module-create',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Create Module'},component: moduleCreate
    },
    {
      path: '/module',name: 'module', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'All Module'}, component: require('@/components/PrimaryInfo/module/index').default
    },
    {
      path: '/module/:id/edit', name: 'editModule',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Module'}, component: moduleEdit
    },
    {
      path: '/menu/create/:module_id',name: 'menuCreate',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Create Menu'},component: menuCreate
    },
    {
      path: '/menu/:id/edit',name: 'menuEdit',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Menu'},component: menuEdit
    },
    {
      path: '/menu/:module_id',name: 'menu',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Menu'},component: menu
    },
    {
      path: '/sub-menu/create/:menu_id', name: 'subMenuCreate', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Create Sub Menu'},component: subMenuCreate
    },
    {
      path: '/sub-menu/:id/edit', name: 'subMenuEdit', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Sub Menu'},component: subMenuEdit
    },
    {
      path: '/sub-menu/:menu_id', name: 'subMenu', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Sub Menu'}, component: subMenu
    },
    {
      path: '/company/create', name: 'createCompany', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Create Company'},component: companyCreate
    },
    {
      path: '/company', name: 'companyList',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Company'},component: allCompany
    },
    {
      path: '/company/:id/edit',name: 'editCompany',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Company'},component: companyEdit
    },
    {
      path: '/employees/create',name: 'createEmployee',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Add Employee'},component: createEmployee
    },
    {
      path: '/employees', name: 'employeesList', meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Employee List'},component: employeesList
    },
    {
      path: '/employees/:id/edit',name: 'employeeEdit', meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Employee List'},component: employeeEdit
    },
    {
      path: '/employees/:id',name: 'employeeShow',meta: {parent: 'Employee', submenu: 'true', breadcrumb: 'Employee List'}, component: employeeShow
    },
    {
      path: '/designation/create', name: 'createDesignation',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Create Employee Designation'},component: createDesignation
    },
    {
      path: '/designation',name: 'designationList', meta: {parent: 'Employee', subparent: 'Settings', submenu: 'true', breadcrumb: 'Settings', breadcrumb2: 'Designation'},component: alldesignation
    },
    { path: '/designation/:id/edit',name: 'editDesignation',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Employee Designation'},component: editDesignation
    },
    {path: '/roles', name: 'roles', meta: {parent: 'Settings', submenu: 'false', breadcrumb: 'All Roles'}, component: require('@/components/PrimaryInfo/acl/role/index').default},

    {path: '/roles/create', name: 'RoleCreate', meta: {parent: 'Settings', submenu: 'false', breadcrumb: 'Create Role'}, component: require('@/components/PrimaryInfo/acl/role/create').default},

    {path: '/roles/:id/edit', name: 'RoleEdit', meta: {parent: 'Settings', submenu: 'false', breadcrumb: 'Edit Role'}, component: require('@/components/PrimaryInfo/acl/role/edit').default},

    {path: '/permissions', name: 'permissions', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Permissions'}, component: require('@/components/PrimaryInfo/acl/permission/index').default},

    {path: '/permissions/create', name: 'permissionCreate', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Create Permissions'}, component: require('@/components/PrimaryInfo/acl/permission/create').default},

    {path: '/permissions/:id/edit', name: 'permissionEdit', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Permissions'}, component: require('@/components/PrimaryInfo/acl/permission/edit').default},

    {path: '/permission-role/:id', name: 'permissionRole', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Permissions Assign to Role'}, component: require('@/components/PrimaryInfo/acl/Acl').default},

    {path: '/regiments', name: 'regiments', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Division',breadcrumb2:'null'}, component: require('@/components/primaryInfo/regiment/index').default},

  {path: '/mail', name: 'mail', meta: {parent: 'Send E-mail', submenu: 'true', breadcrumb: 'Custom Mail', breadcrumb2: 'null'}, component: require('@/components/mail/create').default},
  {path: '/manually-mail', name: 'manuallyMail', meta: {parent: 'Send E-mail', submenu: 'true', breadcrumb: 'Manually', breadcrumb2: 'null'}, component: require('@/components/mail/manuallySend').default},
  {path: '/bulk-mail', name: 'bulkMail', meta: {parent: 'Send E-mail', submenu: 'true', breadcrumb: 'Bulk', breadcrumb2: 'null'}, component: require('@/components/mail/bulkSend').default},

  {path: '/custom-sms', name: 'sms', meta: {parent: 'Send SMS', submenu: 'true', breadcrumb: 'Custom SMS', breadcrumb2: 'null'}, component: require('@/components/sms/custom').default},

  {path: '/sms', name: 'manuallySms', meta: {parent: 'Send SMS', submenu: 'true', breadcrumb: 'Manually', breadcrumb2: 'null'}, component: require('@/components/sms/manuallySend').default},
  {path: '/bulk-sms', name: 'bulkSms', meta: {parent: 'Send SMS', submenu: 'true', breadcrumb: 'Bulk', breadcrumb2: 'null'}, component: require('@/components/sms/bulkSend').default},
  {
    path: '/403',
    meta: {parent: 'Errors', breadcrumb: 'Not Authorized'},
    component: error403
  },
  {
    path: '/500',
    meta: {parent: 'Errors', breadcrumb: 'Server Error'},
    component: error500
  },
  {
    path: '/204',
    meta: {parent: 'Under Construction', breadcrumb: 'Comming Soon', breadcrumb2: 'null'},
    component: error204
  },
  {
    path: '*',
    meta: {parent: 'Errors', breadcrumb: 'Not found'},
    component: error404
  },
  ]

let routes = baseRoutes.concat(AccRoute);
 routes = routes.concat(HrRoute);
const router = new Router({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') != null || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})

export default router
