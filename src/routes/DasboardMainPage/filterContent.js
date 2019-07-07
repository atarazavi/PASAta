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

    constructor(props){

        super(props);
        this.state = {
            data: props.data,
            listItems,
            checkedItems:props.checkedItems,
            ids:props.ids,
            filter:this.props.filter
        }
    }

    componentWillReceiveProps(nextProps){

        // console.log('next prop is ',nextProps);
        this.setState(prev=>{
            return {
                data: nextProps.data,
                listItems,
                checkedItems:nextProps.checkedItems,
                ids:nextProps.ids,
                filter:nextProps.filter
            }
            
        });
    }

    handleToggleListItems(id) {
        // console.log(id);
        this.props.filter(id);
    }

    render() {
        console.log(this.state.data);
        return (
            <RctCollapsibleCard
                heading={this.props.header}
                collapsible={'BcollapsedByDefault'}
            >
                <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={160} autoHide>
                    <List>
                        {this.state.data.map((data, key) => (
                            <ListItem style={{padding: 0}} button onClick={() => this.handleToggleListItems(this.state.ids[key])} key={key}>
                                <Checkbox color="primary" checked={this.state.checkedItems.indexOf(this.state.ids[key]) === -1 ? false : true} />
                                <ListItemText primary={data} />
                                <ListItemSecondaryAction>
                                    <IconButton className="text-indigo"></IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}

                        {/* {this.state.listItems.map((data, key) => (
                            <ListItem style={{padding: 0}} button onClick={() => this.handleToggleListItems(key)} key={key}>
                                <Checkbox color="primary" checked={data.status} />
                                <ListItemText primary={data.itemName} />
                                <ListItemSecondaryAction>
                                    <IconButton className="text-indigo"><i className={data.icon}></i></IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))} */}
                    </List>
                </Scrollbars>
            </RctCollapsibleCard>
        );
    }
}

export default CheckboxListComponent;