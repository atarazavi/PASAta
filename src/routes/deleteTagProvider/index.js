
import React, { Component } from 'react';
import {
  Card,
  CardText,
  CardTitle,
  Button,
} from 'reactstrap';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// app config
import AppConfig from '../../constants/AppConfig';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';
const giventoken = localStorage.getItem('given_token')
const currentLanguagecode = localStorage.getItem('Current_lang')

export default class Cards extends Component {

    handleClick = () => {
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/provider/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': giventoken,
                    'Accept-Language': currentLanguagecode
                },
                body: JSON.stringify({
                    "id": this.props.location.state.provider_id
                })
            });
            const content = await rawResponse.json();
            if (content.status == 200) {
                // Show notification about success on editing...
                // Show notification about success on editing...
                // Show notification about success on editing...
                // Show notification about success on editing...
                setTimeout(() => {
                    this.props.history.push('tagProvidersList');
                }, 1000);
            }else{
                // Show notification about the problem!!!!!!! on editing...
                // Show notification about the problem!!!!!!! on editing...
                // Show notification about the problem!!!!!!! on editing...
                // Show notification about the problem!!!!!!! on editing...
            }
        })();
    } 

    render() {
        return (
            <div className="card-wrapper">
            <PageTitleBar title={<IntlMessages id="sidebar.cards" />} match={this.props.match} />
            <RctCollapsibleCard heading={"Delete : " + this.props.location.state.provider_name}>
                <div className="row">
                    <div className="col-sm-12 col-md-4 mb-30">
                        <Card body inverse color="danger">
                            <CardTitle>{"حذف " + this.props.location.state.provider_name}</CardTitle>
                            <Button onClick={this.handleClick} value="reject" color="light">حذف</Button>
                        </Card>
                    </div>
                </div>
                
                <Button
                    onClick={() => this.props.history.push('tagProvidersList')}
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