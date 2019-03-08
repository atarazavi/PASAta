/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, Redirect } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
// import Recaptcha from 'react-recaptcha'

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
    isverifiedCaptcha: true
  }

  /**
   * On User Login
   */
  onUserLogin() {
    if (this.state.email !== '' && this.state.password !== '' && this.state.isverifiedCaptcha) {
      PAS_Authentication.login(this.state.email, this.state.password ,() => {
        this.props.history.push('/horizontal/tables/data-table');
      });
    }
  }
  
  setsessiondata = (token, expiresIn) => {
    let expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', token);
    localStorage.setItem('expires_at', expiresAt);
    console.log('setsessiondataDONE!!!');
    
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
                      <p className="mb-0">Coin Authentication Service</p>
                    </div>
                    <Form>
                      <FormGroup className="has-wrapper">
                        <Input type="mail" value={email} name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Username" onChange={(event) => this.setState({ email: event.target.value })} />
                        <span className="has-icon"><i className="ti-user"></i></span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input value={password} type="Password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
                        <span className="has-icon"><i className="ti-lock"></i></span>
                      </FormGroup>
                      <FormGroup className="mb-15">
                        <Button
                          color="primary"
                          className="btn-block text-white w-100"
                          variant="raised"
                          size="large"
                          onClick={() => this.onUserLogin()}>
                          Sign In
                        </Button>
                      </FormGroup>
                    </Form>
                  </div>
                </div>
                <div className="col-sm-5 col-md-5 col-lg-4">
                  <SessionSlider />
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
