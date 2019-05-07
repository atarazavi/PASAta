/**
 * Checkbox List Component
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Scrollbars } from 'react-custom-scrollbars';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const listItems = [
    {
        itemName: 'Facebook',
        status: false,
    },
    {
        itemName: 'Google PLus',
        status: false,
    },
    {
        itemName: 'Twitter',
        status: false,
    },
    {
        itemName: 'RSS',
        status: false,
    },
    {
        itemName: 'Android',
        status: false,
    }
]

class CheckboxListComponent extends Component {
    // Interactive State
    state = {
        listItems
    };
    handleToggleListItems(key) {
        let items = this.state.listItems;
        items[key].status = !items[key].status;
        this.setState({ [listItems]: items });
    }

    render() {
        return (
            <RctCollapsibleCard
                heading={<IntlMessages id="widgets.checkboxListControl" />}
            >
                <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={460} autoHide>
                    <List>
                        {this.state.listItems.map((data, key) => (
                            <ListItem style={{padding: 0}} button onClick={() => this.handleToggleListItems(key)} key={key}>
                                <Checkbox color="primary" checked={data.status} />
                                <ListItemText primary={data.itemName} />
                                <ListItemSecondaryAction>
                                    <IconButton className="text-indigo"><i className={data.icon}></i></IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Scrollbars>
            </RctCollapsibleCard>
        );
    }
}

export default CheckboxListComponent;