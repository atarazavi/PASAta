/**
 * Prevent Scroll Buttons
 */
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
	Form,
    Input,
    Button
} from 'reactstrap';

import FilterContent from '../filterContent'

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function TabContainer({ children }) {
    return (
        <Typography component="div" style={{ padding: 3 * 3 }}>
            {children}
        </Typography>
    );
}

class PreventScrollButtons extends Component {

    state = {
        activeIndex: 0
    }

    handleChange(e, value) {
        this.setState({ activeIndex: value });
    }

    render() {
        const { activeIndex } = this.state;
        return (
            <RctCollapsibleCard
                heading={
                    <RctCollapsibleCard heading="Filter">
                        <Form>
                            <Input className="mb-20" placeholder="sm" bsSize="sm" />
                            <Input className="mb-20" type="select" bsSize="sm"><option>Small Select</option></Input>
                            <Button className="mb-10" color="primary">Submit</Button>
                        </Form>
                    </RctCollapsibleCard>
                }
            >
                <AppBar position="static" color="primary">
                    <Tabs value={activeIndex} onChange={(e, value) => this.handleChange(e, value)} scrollable scrollButtons="off">
                        <Tab style={{minWidth: 90}} label="کالا" />
                        <Tab style={{minWidth: 90}} label="گروه بندی کالا" />
                        <Tab style={{minWidth: 90}} label="اطلاعات جغرافیایی" />
                    </Tabs>
                </AppBar>
                {activeIndex === 0 && 
                    <TabContainer>
                        <FilterContent />
                        <FilterContent />
                        <FilterContent />
                        <FilterContent />
                    </TabContainer>}
                {activeIndex === 1 && 
                    <TabContainer>
                        سیبلا
                    </TabContainer>}
                {activeIndex === 2 && 
                    <TabContainer>
                        <FilterContent />
                    </TabContainer>}
            </RctCollapsibleCard>
        );
    }
}

export default PreventScrollButtons;
