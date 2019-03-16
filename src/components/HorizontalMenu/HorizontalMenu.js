/**
 * Horizontal Menu
 */
import React, { Component } from 'react';

import IntlMessages from 'Util/IntlMessages';

import navLinks from './NavLinks';

import NavMenuItem from './NavMenuItem';

import { withRouter, BrowserRouter } from 'react-router-dom'

import PAS_Authentication from '../../Auth/PAS_Auth'

class HorizontalMenu extends Component {
    render() {
        return (
            <div className="horizontal-menu">
                <ul className="list-unstyled nav">
                    <li className="nav-item">
                        <a href="javascript:void(0);" className="nav-link">
                            <i className="zmdi zmdi-view-dashboard"></i>
                            <span className="menu-title"><IntlMessages id="sidebar.general" /></span>
                        </a>
                        <ul className="list-unstyled sub-menu">
                            {navLinks.category1.map((menu, key) => (
                                <NavMenuItem
                                    menu={menu}
                                    key={key}
                                />
                            ))}
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="javascript:void(0);" className="nav-link">
                            <i className="zmdi zmdi-widgets"></i>
                            <span className="menu-title"><IntlMessages id="sidebar.modules" /></span>
                        </a>
                        <ul className="list-unstyled sub-menu">
                            {navLinks.category2.map((menu, key) => (
                                <NavMenuItem
                                    menu={menu}
                                    key={key}
                                />
                            ))}
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="javascript:void(0);" className="nav-link">
                            <i className="zmdi zmdi-view-carousel"></i>
                            <span className="menu-title"><IntlMessages id="sidebar.component" /></span>
                        </a>
                        <ul className="list-unstyled sub-menu">
                            {navLinks.category3.map((menu, key) => (
                                <NavMenuItem
                                    menu={menu}
                                    key={key}
                                />
                            ))}
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="javascript:void(0);" className="nav-link">
                            <i className="zmdi zmdi-wrench"></i>
                            <span className="menu-title">برچسب ها</span>
                        </a>
                        <ul className="list-unstyled sub-menu">
                            {navLinks.category8.map((menu, key) => (
                                <NavMenuItem
                                    menu={menu}
                                    key={key}
                                />
                            ))}
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="javascript:void(0);" className="nav-link">
                            <i className="zmdi zmdi-assignment-check"></i>
                            <span className="menu-title"><IntlMessages id="sidebar.applications" /></span>
                        </a>
                        <ul className="list-unstyled sub-menu">
                            {navLinks.category5.map((menu, key) => (
                                <NavMenuItem
                                    menu={menu}
                                    key={key}
                                />
                            ))}
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="javascript:void(0);" className="nav-link">
                            <i className="zmdi zmdi-assignment-check"></i>
                            <span className="menu-title">مجوزهای دسترسی</span>
                        </a>
                        <ul className="list-unstyled sub-menu">
                            {navLinks.category7.map((menu, key) => (
                                <NavMenuItem
                                    menu={menu}
                                    key={key}
                                />
                            ))}
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a 
                            onClick={() => { 
                                PAS_Authentication.logout(()=>{this.props.history.push('/session/login');})
                            }} 
                            href="javascript:void(0);" 
                            className="nav-link"
                        >
                            <i className="zmdi zmdi-lock"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(HorizontalMenu);
