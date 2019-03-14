/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, Redirect } from 'react-router-dom';
import { Form, FormGroup, Input,Alert } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import Recaptcha from "react-recaptcha";
import Forbidden from '../../../constants/AppConfig';
import LanguageProvider from '../../../components/Header/LanguageProvider';
import IntlMessages from 'Util/IntlMessages';
import { NotificationContainer, NotificationManager } from 'react-notifications';


// components
import { SessionSlider } from 'Components/Widgets';

// axios
import axios from 'axios';

// app config
import AppConfig from 'Constants/AppConfig';

//PAS_Authentication
import PAS_Authentication from '../../../Auth/PAS_Auth'

// redux action
import {
  signinUserInFirebase,
  signinUserWithFacebook,
  signinUserWithGoogle,
  signinUserWithGithub,
  signinUserWithTwitter
} from 'Actions';

class Signin extends Component {

  state = {
    email: '',
    password: '',
    isverifiedCaptcha: false,
    error: false,
    authError:""
  }

  /**
   * On User Login
   */
  showerror = (arg) => {
    this.setState({
      authError:arg
    })
    
  }
  onUserLogin() {
    if (this.state.email !== '' && this.state.password !== '' && this.state.isverifiedCaptcha) {
      PAS_Authentication.login(this.state.email, this.state.password ,() => {
        this.props.history.push('/horizontal/tables/data-table');
      }, this.showerror)
    }
  }
  
  setsessiondata = (token, expiresIn) => {
    let expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', token);
    localStorage.setItem('expires_at', expiresAt);
    console.log('setsessiondataDONE!!!');
    
  }
  callback = (response) => {
    if (response){
      this.setState({
        isverifiedCaptcha : true
      },function () {
        console.log("didcaptcha");
        
      })
    } console.log("didcall");
  }
  onloadcallback() {
    console.log("didload");
  }
  onSearchClick = ( event, value ) => {
     event.preventDefault();
     var stremail = this.state.email;
     var strpass = this.state.password;
     var founded = Forbidden.RegExp;
     var result = stremail.match(founded);
     var resultpass = strpass.match(founded)
     if (result){
       this.setState({
         error:true
       })
     }
     if (resultpass){
      this.setState({
        error:true
      })
    }
    
   
 }
 
  render() {
    const { email, password } = this.state;
    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper">
          {loading &&
            <LinearProgress />
          }
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  <div className="session-logo">
                    <Link to="/">
                      <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                    </Link>
                  </div>
                  <div>
                    <img src={AppConfig.appLogo2} alt="session-logo" className="img-fluid" width="110" height="35" />
                  </div>
                  <div className="h-100 row align-items-center ">
                    <ul className="navbar-right list-inline "><LanguageProvider/></ul>
                  </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <div className="session-inner-wrapper">
            <div className="container">
              <div className="row row-eq-height">
                <div className="col-sm-7 col-md-7 col-lg-8">
                  <div className="session-body text-center">
                    <div className="session-head mb-30">
                      <h2 className="font-weight-bold">{AppConfig.brandName}</h2>
                      <p className="mb-0"><IntlMessages id={"Login.Title"}/></p>
                    </div>
                    <Form onSubmit={ this.onSearchClick.bind( this ) }>
                      <FormGroup className="has-wrapper" onSubmit={ e => { this.onSearchClick(this); e.preventDefault();} }>
                        <Input type="mail" value={email} 
                        name="user-mail" id="user-mail" 
                        className="has-input input-lg" 
                        placeholder="Username" 
                        onChange={(event) => this.setState({ email: event.target.value })} />
                        <span className="has-icon"><i className="ti-user"></i></span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input value={password} type="Password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
                        <span className="has-icon"><i className="ti-lock"></i></span>
                      </FormGroup>
                      <FormGroup className="mb-15">
                        <Button
                        type='submit'
                          color="primary"
                          className="btn-block text-white w-100"
                          variant="raised"
                          size="large"
                          onClick={() => this.onUserLogin()}>
                          <IntlMessages id={"Login.log"}/>
                        </Button>
                        {
                          this.state.error?NotificationManager.error(<IntlMessages id="Login.alert"/>):null
                        }
                        {
                          this.state.authError=="401"?NotificationManager.error(<IntlMessages id="Login.auth"/>):null
                        }
                        {
                          this.state.authError=="500"?NotificationManager.error(<IntlMessages id="Login.server"/>):null
                        }
                      </FormGroup>
                    </Form>
                  </div>
                </div>
                <div>
                <Recaptcha
                 sitekey="6LcZDJcUAAAAAJaORzQpLRlZO3DElm1tDqZbgMEQ"
                  render="explicit"
                  onloadCallback={this.onloadcallback}
                  verifyCallback={this.callback}
                   />,
                </div>
              </div>
            </div>
          </div>
        </div>
      </QueueAnim>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading }
}

export default connect(mapStateToProps, {
  signinUserInFirebase,
  signinUserWithFacebook,
  signinUserWithGoogle,
  signinUserWithGithub,
  signinUserWithTwitter
})(Signin);
