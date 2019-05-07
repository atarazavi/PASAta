/**
 * Drawers
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

//Components
import FilterDrawer from '../DasboardMainPage/filterDrawer';
import { mailFolderListItems, otherMailFolderListItems } from '../components/drawers/component/tileData';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

const styles = {
	list: {
		width: 300,
	},
	listFull: {
		width: 'auto',
	},
};

class DrawerComponent extends React.Component {

	state = {
		top: false,
		left: false,
		bottom: false,
		right: false,
	};

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open,
		});
	};

	render() {
		const { classes } = this.props;
		const sideList = (
			<div className={classes.list}>
				<List>{mailFolderListItems}</List>
				<Divider />
				<List>{otherMailFolderListItems}</List>
			</div>
		);

		const fullList = (
			<div className={classes.listFull}>
				<List>{mailFolderListItems}</List>
				<Divider />
				<List>{otherMailFolderListItems}</List>
			</div>
		);
		return (
			<div className="drawer-wrapper">
				<RctCollapsibleCard>
					<FilterDrawer />
				</RctCollapsibleCard>
			</div>
		);
	}
}

export default withStyles(styles)(DrawerComponent);
