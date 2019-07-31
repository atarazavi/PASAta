
import React, { Component } from 'react';
import {
  Card,
  CardText,
  CardTitle,
  Button,
} from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// app config
import AppConfig from '../../constants/AppConfig';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

export default class Cards extends Component {

    handleClick = (e) => {
		switch(e.target.value) {
			case "accept": { 
                (async () => {
                    const rawResponse = await fetch(AppConfig.baseURL + '/tag/request/accept', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('given_token'),
                            'Accept-Language': localStorage.getItem('Current_lang')
                        },
                        body: JSON.stringify({
                            "id": this.props.location.state.tags_id
                        })
                    });
                    const content = await rawResponse.json();
                    if (content.status == 200) {
                        NotificationManager.success(<IntlMessages id="Edit.success"/>)
                      // Show notification about success on editing...
                      setTimeout(() => {
                          this.props.history.push('requestedTagslist');
                      }, 1000);
                    }else{
                        NotificationManager.error(<IntlMessages id="Edit.fail"/>)
                      // Show notification about the problem!!!!!!! on editing...
                    }
                })();
				break;  
			} 
			case "reject": { 
                (async () => {
                    const rawResponse = await fetch(AppConfig.baseURL + '/tag/request/deny', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('given_token'),
                            'Accept-Language': currentLanguagecode
                        },
                        body: JSON.stringify({
                            "id": this.props.location.state.tags_id
                        })
                    });
                    const content = await rawResponse.json();
                    if (content.status == 200) {
                        NotificationManager.success(<IntlMessages id="Edit.success"/>)
                      // Show notification about success on editing...
                      setTimeout(() => {
                          this.props.history.push('requestedTagslist');
                      }, 1000);
                    }else{
                        NotificationManager.error(<IntlMessages id="Edit.fail"/>)
                      // Show notification about the problem!!!!!!! on editing...
                    }
                })();
				break;  
			} 
        }
    }

    render() {
        return (
            <div className="card-wrapper">
            <PageTitleBar title={<IntlMessages id="sidebar.cards" />} match={this.props.match} />
            <RctCollapsibleCard heading={"Accept Or Reject Request with code : " + this.props.location.state.tags_id}>
                <div className="row">
                    <div className="col-sm-12 col-md-4 mb-30">
                        <Card body inverse color="success">
                            <CardTitle><IntlMessages id="ekhtesasebarchasb"/></CardTitle>
                            <Button onClick={this.handleClick} value="accept" color="light"><IntlMessages id="ekhtesas"/></Button>
                        </Card>
                    </div>
                    <div className="col-sm-12 col-md-4 mb-30">
                        <Card body inverse color="danger">
                            <CardTitle><IntlMessages id="adame ekhtesase barchasb"/></CardTitle>
                            <Button onClick={this.handleClick} value="reject" color="light"><IntlMessages id="adame ekhtesas"/></Button>
                        </Card>
                    </div>
                </div>
                
                <Button
                    onClick={() => this.props.history.push('requestedTagslist')}
                    variant="raised"
                    color="secondary"
                    className="text-white btn-xs mb-10"
                >
                    <IntlMessages id="button.return_to_table_list" />
                </Button>
            </RctCollapsibleCard>
            </div>
        );
    }
}