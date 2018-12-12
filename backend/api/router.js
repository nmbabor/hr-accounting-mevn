var acl = require('express-acl')
var jwt = require('jsonwebtoken')
const AuthController = require('./controllers/AuthController')
const AccessController = require('./controllers/acl/AccessController')
const PermissionRoleController = require('./controllers/acl/PermissionRoleController')

acl.config({
    filename: 'nacl.json',
    baseUrl: 'api',
    yml: true
});
module.exports = function (app, express) {
    var ROUTER = express.Router();
    ROUTER.use(function (req, res, next) {
        try {
        var token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return next(new Error('No token Provided'));
        }

        jwt.verify(token, 'SECRET', function (err, decoded) {
            if (err) {
                return res.status(401).json(err);
            }
            req.decoded = decoded;
            return next();
        });
        } catch (e) {
            res.status(401).json({
                message: 'Authentication Faild!'
            })
        }
    });
    //app.use(acl.authorize);
    app.get('/', (req,res) => {
        res.json('Documentation is coming soon')
    });

    ROUTER.use(acl.authorize.unless({
        path: ['/']
    }));
    /* Route  */


    /* Route  */
    const PrimaryInfoRouter = require('./routes/PrimaryInfoRouter');
    const CompanyRoute = require('./routes/CompanyRoute');
    const DesignationRoute = require('./routes/DesignationRoute');
    const userRoute = require('./routes/user');
    const moduleRoute = require('./routes/moduleRoute');
    const MenuRoute = require('./routes/MenuRoute');
    const SubMenuRoute = require('./routes/SubMenuRoute');
    const RoleRoute = require('./routes/RoleRoute');
    const PermissionRoute = require('./routes/PermissionRoute');
    const PermissionRoleRoute = require('./routes/PermissionRoleRoute');
    const EmployeeImportRoute = require('./routes/EmployeeImportRoute')
    const FrontendRoute = require('./routes/FrontendRoute');
    const DepartmentRoute = require('./modules/hr/department/DepartmentRoute');
    const EmployeeRoute = require('./modules/hr/employee/EmployeeRoute');
    const RegimentRoute = require('./modules/regiment/RegimentRoute');
    const RankRoute = require('./modules/rank/RankRoute')
    const DistrictsRoute = require('./modules/districts/DistrictsRoute')
    const SalaryGradeRoute = require('./modules/hr/salary-grade/SalaryGradeRoute')
    const SalaryStepRoute = require('./modules/hr/salary-step/SalaryStepRoute')
    let FrontendController = require('./controllers/FrontendController')
    /* Without Permission */
    app.post('/api/login',AuthController.login);
    app.get('/api/token-check',AuthController.tokenCheck);
    app.get('/api/acl', AccessController.index);
    app.get('/api/access', PermissionRoleController.index);
    app.get('/api/frontend/info', FrontendController.primaryInfo);

    /* With Permission */
    ROUTER.use('/users', userRoute);
    ROUTER.use('/module', moduleRoute);
    ROUTER.use('/menu', MenuRoute);
    ROUTER.use('/sub-menu', SubMenuRoute);
    ROUTER.use('/roles', RoleRoute);
    ROUTER.use('/permissions', PermissionRoute);
    ROUTER.use('/permission-role', PermissionRoleRoute);
    ROUTER.use('/company',CompanyRoute);
    ROUTER.use('/primary-info',PrimaryInfoRouter);
    ROUTER.use('/designation',DesignationRoute);
    ROUTER.use('/frontend',FrontendRoute);
    ROUTER.use('/departments',DepartmentRoute);
    ROUTER.use('/regiments',RegimentRoute);
    ROUTER.use('/employees', EmployeeRoute);
    ROUTER.use('/ranks', RankRoute);
    ROUTER.use('/districts', DistrictsRoute);
    ROUTER.use('/salary-grade', SalaryGradeRoute);
    ROUTER.use('/salary-step', SalaryStepRoute);
    ROUTER.use('/employees',EmployeeRoute);
    ROUTER.use('/attendance',require('./modules/hr/attendance/AttendanceRoute'));
    ROUTER.use('/budget',require('./modules/acc/budget/BudgetRoute'));
    ROUTER.use('/budget-head',require('./modules/acc/budget/head/HeadRoute'));
    ROUTER.use('/ntr-fields',require('./modules/acc/ntr/ntrFields/NtrFieldsRoute'));
    ROUTER.use('/budget-session',require('./modules/acc/budget/session/SessionRoute'));
    ROUTER.use('/budget-distribution',require('./modules/acc/budget/distribution/DistributionRoute'));
    ROUTER.use('/budget-find',require('./modules/acc/budget/find/BudgetFindRoute'));
    ROUTER.use('/ntr',require('./modules/acc/ntr/NtrRoute'));
    ROUTER.use('/ntr-find',require('./modules/acc/ntr/find/NtrFindRoute'));
    ROUTER.use('/welfare',require('./modules/acc/welfare/WelfareRoute'));
    ROUTER.use('/welfare-find',require('./modules/acc/welfare/find/FindRoute'));
    ROUTER.use('/expenditure',require('./modules/acc/expenditure/ExpenditureRoute'));
    ROUTER.use('/bank-book',require('./modules/acc/bankBook/BankBookRoute'));
    ROUTER.use('/bank-withdraw',require('./modules/acc/bankBook/withdraw/WithdrawRoute'));
    ROUTER.use('/welfare-expenditure',require('./modules/acc/welfare/expenditure/ExpenditureRoute'));
    ROUTER.use('/reports',require('./modules/acc/reports/BudgetReportRoute'));
    /*HR*/
    ROUTER.use('/office-schedule',require('./modules/hr/office-schedule/OfficeScheduleRoute'));
    ROUTER.use('/performance',require('./modules/hr/employee/performance/PerformanceRoute'));
    ROUTER.use('/award',require('./modules/hr/employee/award/AwardRoute'));
    ROUTER.use('/punishment',require('./modules/hr/employee/punishment/PunishmentRoute'));
    ROUTER.use('/termination',require('./modules/hr/employee/termination/TerminationRoute'));
    ROUTER.use('/transfer',require('./modules/hr/employee/transfer/TransferRoute'));
    ROUTER.use('/mail',require('./modules/mail/MailRoute'));
    ROUTER.use('/sms',require('./modules/sms/SmsRoute'));
    app.use('/api', ROUTER);
}