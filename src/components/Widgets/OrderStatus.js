/**
 * Order Status Widget
 */
import React, { Component } from 'react';
import IntlMessages from 'Util/IntlMessages';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// api
import api from 'Api'

export default class OrderStatus extends Component {

    state = {
        ordersStatus: null
    }

    componentDidMount() {
        this.getOrdersStatus();
    }

    // get orders status
    getOrdersStatus() {
        api.get('ordersStatus.js')
            .then((response) => {
                console.log(response);
                
                this.setState({ ordersStatus: response.data });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { ordersStatus } = this.state;
        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th><IntlMessages id="sidebar.users"/></th>
                            <th><IntlMessages id="widgets.orderDate"/></th>
                            <th><IntlMessages id="widgets.amount"/></th>
                            <th><IntlMessages id="tag.status"/></th>
                            <th><IntlMessages id="widgets.tagtype"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersStatus && ordersStatus.map((order, key) => (
                            <tr key={key}>
                                <td><Tooltip id="tooltip-fab" title={<IntlMessages id="tooltip.error" />}>
							            <IconButton className="text-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete?')) this.deletehandler() } } aria-label="Delete" id="delete">
							                <i className="zmdi zmdi-close"></i>
							            </IconButton>
						        </Tooltip>
                                <Tooltip id="tooltip-fab" title={<IntlMessages id="tooltip.Ok" />}>
							            <IconButton className="text-success" onClick={() => { if (window.confirm('Are you sure you wish to delete?')) this.deletehandler() } } aria-label="Delete" id="delete">
                                        <i class="zmdi zmdi-check"></i>
							            </IconButton>
						        </Tooltip>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-left mr-15">
                                            <img src={order.userAvatar} className="rounded-circle" alt="user profile" width="50" height="50" />
                                        </div>
                                        <div className="media-body pt-15">
                                            <h4>{order.userName}</h4>
                                        </div>
                                    </div>
                                </td>
                                <td>{order.orderDate}</td>
                                <td>{order.amount}</td>
                                <td>
                                    {/* <span className={`badge badge-${order.badgeClass}`}>{order.status} */}
                                    <IconButton className="text-warning" onClick={() => { if (window.confirm('Are you sure you wish to delete?')) this.deletehandler() } } aria-label="Delete" id="delete">
                                    <i class="zmdi zmdi-hourglass-alt"></i>
							            </IconButton>
                                    {/* </span> */}
                                </td>
                                <td>{order.trackingNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
