// routes
import Widgets from 'Routes/widgets';
import Pages from 'Routes/pages';
import AdvanceUIComponents from 'Routes/advance-ui-components';
import CalendarComponents from 'Routes/calendar';
import ChartsComponents from 'Routes/charts';
import FormElements from 'Routes/forms';
import Users from 'Routes/users';
import Components from 'Routes/components';
import Tables from 'Routes/tables';
import Icons from 'Routes/icons';
import Maps from 'Routes/maps';
import DragAndDrop from 'Routes/drag-drop';
import Editor from 'Routes/editor';
import Ecommerce from 'Routes/ecommerce';
import Dashboard from 'Routes/dashboard';
import ImageCropper from 'Routes/image-cropper';
import VideoPlayer from 'Routes/video-player';
import Dropzone from 'Routes/dropzone';
import changePass from 'Routes/changePass';
import editUser from 'Routes/editUser';
import addUser from 'Routes/addUser';
import changeRoles from 'Routes/changeRoles';
import groupsList from 'Routes/groupsList';
import roleList from 'Routes/roleList';
import editGroup from 'Routes/editGroup';
import editRole from 'Routes/editRole';
import editAction from 'Routes/editAction';
import changeGroupRole from 'Routes/changeGroupRole';
import addNewGroup from 'Routes/addNewGroup';
import addNewRole from 'Routes/addNewRole';
import addNewAction from 'Routes/addNewAction';
import addAction2Role from 'Routes/addAction2Role';
import actionList from 'Routes/actionList';
import tagBulkOrder from 'Routes/tagBulkOrder';
import viewTags from 'Routes/viewTags';
import editTags from 'Routes/editTags';
import tagChangeStatus from 'Routes/tagChangeStatus';
import tagDelete from 'Routes/tagDelete';
import tagInventory from 'Routes/tagInventory';
import tagMoreinfo from 'Routes/tagMoreinfo';
import editBulkOrder from 'Routes/editBulkOrder';
import deleteBulkOrder from 'Routes/deleteBulkOrder';
import bulkOrderMoreinfo from 'Routes/bulkOrderMoreinfo';
import changePackageStatus from 'Routes/changePackageStatus';
import tagRequest from 'Routes/tagRequest';
import requestedTagsList from 'Routes/requestedTagsList';
import requestedTagsMoreinfo from 'Routes/requestedTagsMoreinfo';
import changeTagRequestStatus from 'Routes/changeTagRequestStatus';
import requestedTagsDelete from 'Routes/requestedTagsDelete';
import tagProvidersList from 'Routes/tagProvidersList';
import productTap from 'Routes/productTap';
import editTagProvider from 'Routes/editTagProvider';
import deleteTagProvider from 'Routes/deleteTagProvider';
import addTagProvider from 'Routes/addTagProvider';
import tagPackagesList from 'Routes/tagPackagesList';
import tagPoolList from 'Routes/tagPoolList';
import tagPoolEditTag from 'Routes/tagPoolEditTag';
import DasboardMainPage from 'Routes/DasboardMainPage';


// async component
import {
	AsyncAboutUsComponent,
	AsyncChatComponent,
	AsyncMailComponent,
	AsyncTodoComponent,
} from 'Components/AsyncComponent/AsyncComponent';

export default [
	{
		path: 'dashboard',
		component: Dashboard
	},
	{
		path: 'widgets',
		component: Widgets
	},
	{
		path: 'ecommerce',
		component: Ecommerce
	},
	{
		path: 'icons',
		component: Icons
	},
	{
		path: 'about-us',
		component: AsyncAboutUsComponent
	},
	{
		path: 'pages',
		component: Pages
	},
	{
		path: 'chat',
		component: AsyncChatComponent
	},
	{
		path: 'mail',
		component: AsyncMailComponent
	},
	{
		path: 'todo',
		component: AsyncTodoComponent
	},
	{
		path: 'charts',
		component: ChartsComponents
	},
	{
		path: 'tables',
		component: Tables
	},
	{
		path: 'maps',
		component: Maps
	},
	{
		path: 'users',
		component: Users
	},
	{
		path: 'ui-components',
		component: Components
	},
	{
		path: 'advanced-component',
		component: AdvanceUIComponents
	},
	{
		path: 'drag-andDrop',
		component: DragAndDrop
	},
	{
		path: 'forms',
		component: FormElements
	},
	{
		path: 'editor',
		component: Editor
	},
	{
		path: 'calendar',
		component: CalendarComponents
	},
	{
		path: 'image-cropper',
		component: ImageCropper
	},
	{
		path: 'video-player',
		component: VideoPlayer
	},
	{
		path: 'dropzone',
		component: Dropzone
	},
	{
		path: 'changePass',
		component: changePass
	},
	{
		path: 'editUser',
		component: editUser
	},
	{
		path: 'changeRoles',
		component: changeRoles
	},
	{
		path: 'addUser',
		component: addUser
	},
	{
		path: 'groupsList',
		component: groupsList
	},
	{
		path: 'roleList',
		component: roleList
	},
	{
		path: 'actionList',
		component: actionList
	},
	{
		path: 'editGroup',
		component: editGroup
	},
	{
		path: 'editRole',
		component: editRole
	},
	{
		path: 'editAction',
		component: editAction
	},
	{
		path: 'changeGroupRole',
		component: changeGroupRole
	},
	{
		path: 'addNewGroup',
		component: addNewGroup
	},
	{
		path: 'addNewRole',
		component: addNewRole
	},
	{
		path: 'addAction2Role',
		component: addAction2Role
	},
	{
		path: 'addNewAction',
		component: addNewAction
	},
	{
		path: 'tagBulkOrder',
		component: tagBulkOrder
	},
	{
		path: 'viewTags',
		component: viewTags
	},
	{
		path: 'editTags',
		component: editTags
	},
	{
		path: 'tagChangeStatus',
		component: tagChangeStatus
	},
	{
		path: 'tagMoreinfo',
		component: tagMoreinfo
	},
	{
		path: 'tagDelete',
		component: tagDelete
	},
	{
		path: 'tagInventory',
		component: tagInventory
	},
	{
		path: 'editBulkOrder',
		component: editBulkOrder
	},
	{
		path: 'deleteBulkOrder',
		component: deleteBulkOrder
	},
	{
		path: 'bulkOrderMoreinfo',
		component: bulkOrderMoreinfo
	},
	{
		path: 'changePackageStatus',
		component: changePackageStatus
	},
	{
		path: 'tagRequest',
		component: tagRequest
	},
	{
		path: 'requestedTagsList',
		component: requestedTagsList
	},
	{
		path: 'requestedTagsMoreinfo',
		component: requestedTagsMoreinfo
	},
	{
		path: 'changeTagRequestStatus',
		component: changeTagRequestStatus
	},
	{
		path: 'requestedTagsDelete',
		component: requestedTagsDelete
	},
	{
		path: 'tagProvidersList',
		component: tagProvidersList
	},
	{
		path: 'editTagProvider',
		component: editTagProvider
	},
	{
		path: 'deleteTagProvider',
		component: deleteTagProvider
	},
	{
		path: 'addTagProvider',
		component: addTagProvider
	},
	{
		path: 'tagPackagesList',
		component: tagPackagesList
	},
	{
		path: 'tagPoolList',
		component: tagPoolList
	},
	{
		path: 'tagPoolEditTag',
		component: tagPoolEditTag
	},
	{
		path: 'product/:tapid',
		component: productTap
	},
	{
		path: 'DasboardMainPage',
		component: DasboardMainPage
	},
	
	
] 