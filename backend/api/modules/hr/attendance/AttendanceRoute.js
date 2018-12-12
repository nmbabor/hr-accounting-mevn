const express = require('express')
const route = express.Router();
const controller = require('./AttendanceController')
route.get('/',controller.index);
route.get('/active-regiment',controller.activeRegiments);
route.post('/',controller.store);
route.get('/department',controller.department);
route.get('/office-schedule',controller.officeScheduleToAttendance);
route.get('/:regiment/employee',controller.employee);
route.get('/check-attendance',controller.attnCheck);
route.get('/show',controller.show);
route.put('/',controller.update);
route.delete('/',controller.destroy);
module.exports = route