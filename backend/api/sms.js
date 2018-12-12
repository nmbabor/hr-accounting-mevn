const axios = require('axios')
class Sms {
    async send(number, text) {

        let responsoe = await axios.get(' http://107.20.199.106/api/v3/sendsms/plain', {
            params: {
                user:'bcicd',
                password:'Srabon@2017/69',
                sender:'8804445650696',
                SMSText:text,
                GSM:number,
                type:'longSMS'
            }
        })
        return responsoe.data;
    }

}
module.exports = new Sms;
