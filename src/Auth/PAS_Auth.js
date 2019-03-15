
// app config
import AppConfig from '../constants/AppConfig';
import { Redirect } from 'react-router-dom';

class PAS_Auth {
    constructor() {
      this.authenticated;
      this.lastToken = '';
    }
  
    login(uName, password, fromlink, cb, response) {
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/user/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({"username":uName,"password":password})
                // body: JSON.stringify({"username":"admin","password":"Pas@2018"})
            });
            const content = await rawResponse.json();
            console.log(content);
            if (content.status == 200 ){
                console.log('content.token',content.token);
                this.authenticated = true;
                this.lastToken = content.token;
                localStorage.setItem("given_token", content.token);
                localStorage.setItem("isAuthenticated", true);
                if (fromlink){
                  this.props.history.push(fromlink);
                }else{cb();}
            }else {
                response(content.status)
              }
        })();
    }
  
    logout(cb) {
        console.log('logout in pas_auth')
        localStorage.removeItem('given_token');
        localStorage.setItem("isAuthenticated", false);
        this.authenticated = false;
        this.lastToken = '';
        cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new PAS_Auth();