/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';

// redux actions
import { onToggleMenu } from 'Actions';

class SidebarContent extends Component {

    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        }
        this.props.onToggleMenu(data);
    }

    render() {
        const { sidebarMenus } = this.props.sidebar;
        return (
            <div className="rct-sidebar-nav">
                <nav className="navigation">
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={<ListSubheader className="side-title" component="li"></ListSubheader>}
                    >
                        {sidebarMenus.category2.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category2')}
                            />
                        ))}
                        {sidebarMenus.category3.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category3')}
                            />
                        ))}
                        {sidebarMenus.category4.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category4')}
                            />
                        ))}
                        {sidebarMenus.category5.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category5')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={<ListSubheader className="side-title" component="li"></ListSubheader>}
                    >
                        {sidebarMenus.category6.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category6')}
                            />
                        ))}
                        {sidebarMenus.category7.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category7')}
                            />
                        ))}
                        {sidebarMenus.category8.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category8')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={<ListSubheader className="side-title" component="li"></ListSubheader>}
                    >
                        {sidebarMenus.category9.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category8')}
                            />
                        ))}
                    </List>
                </nav>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ sidebar }) => {
    return { sidebar };
};

export default withRouter(connect(mapStateToProps, {
    onToggleMenu
})(SidebarContent));
