import axios from 'axios';
import {createMessageBox} from '../components/MessageBox';

const infoBox = createMessageBox('info');
const STATUS = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

const request = axios.create({
   baseURL: '/'
});


request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

request.interceptors.request.use(function (config) {

    console.log(`%c Method ---> ${config.method}`, 'color:green;');
    console.log(`%c Url ---> ${config.url}`, 'color: green');
    console.log(`Data ---> ${JSON.stringify(config.data)}`);



    return config;
});


request.interceptors.response.use(function (response) {

    return new Promise((resolve, reject) => {
        function _reject (err) {
            infoBox.show(err.message);
            reject(err);
        }

        const {status, data} = response;

        if (status === STATUS.SUCCESS) {
            switch (data.code) {
                case 200:
                    resolve(data.data);break;
                default:
                    _reject(data);break;
            }
        } else {
            _reject({
                code: response.status,
                message: response.statusText
            })
        }
    });

}, function (err) {
    infoBox.show(err.message);
    return Promise.reject(err);
});

export default request;
