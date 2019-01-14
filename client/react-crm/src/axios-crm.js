import axios from 'axios';

let url = 'http://payontime.zubala.com/crm-customer/api/';
console.log(process.env.REACT_APP_STAGE);
if (process.env.REACT_APP_STAGE === 'dev') {
  url = 'http://192.168.0.5:8080/api/';
}

const instance = axios.create({
   baseURL: url
});

export default instance;
