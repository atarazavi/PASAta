
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
            });
            const content = await rawResponse.json();
            if (content.status == 200 ){
                this.authenticated = true;
                this.lastToken = content.token;
                localStorage.setItem("given_token", content.token);
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("actionDTOS", JSON.stringify(content.result.actionDTOS));
                if (fromlink){
                  this.props.history.push(fromlink);
                }else{cb();}
            }else {
                response(content.status)
              }
        })();
    }
  
    logout(cb) {
        localStorage.removeItem('given_token');
        localStorage.setItem("isAuthenticated", false);
        localStorage.setItem("actionDTOS", false);
        this.authenticated = false;
        this.lastToken = '';
        cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new PAS_Auth();