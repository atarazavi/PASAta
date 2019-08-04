// sidebar nav links
export default {
	category1: [
		{
			"menu_title": "sidebar.dashboard",
			"menu_icon": "zmdi zmdi-view-dashboard",
			"child_routes": [
				{
					"menu_title": "sidebar.ecommerce",
					"path": "/app/dashboard/ecommerce",
				},
				{
					"path": "/horizontal/dashboard/saas",
					"menu_title": "sidebar.saas"
				},
				{
					"path": "/agency/dashboard/agency",
					"menu_title": "sidebar.agency"
				},
				{
					"path": "/boxed/dashboard/news",
					"menu_title": "sidebar.news"
				},
			]
		},
		{
			"menu_title": "sidebar.ecommerce",
			"menu_icon": "zmdi zmdi-shopping-cart",
			"child_routes": [
				{
					"path": "/app/ecommerce/shop",
					"menu_title": "sidebar.shop"
				},
				{
					"path": "/app/ecommerce/cart",
					"menu_title": "sidebar.cart"
				},
				{
					"path": "/app/ecommerce/checkout",
					"menu_title": "sidebar.checkout"
				},
				{
					"path": "/app/ecommerce/shop-list",
					"menu_title": "sidebar.shopList"
				},
				{
					"path": "/app/ecommerce/shop-grid",
					"menu_title": "sidebar.shopGrid"
				},
				{
					"path": "/app/ecommerce/invoice",
					"menu_title": "sidebar.invoice"
				}
			]
		},
		{
			"menu_title": "sidebar.widgets",
			"menu_icon": "zmdi zmdi-widgets",
			"path": "/app/widgets",
			"child_routes": [
				{
					"path": "/app/widgets/charts",
					"menu_title": "sidebar.charts"
				},
				{
					"path": "/app/widgets/promo",
					"menu_title": "sidebar.promo"
				},
				{
					"path": "/app/widgets/general",
					"menu_title": "sidebar.general"
				},
				{
					"path": "/app/widgets/user",
					"menu_title": "sidebar.user"
				},


			]
		},
		{
			"menu_title": "sidebar.pages",
			"menu_icon": "zmdi zmdi-file-plus",
			"child_routes": [
				{
					"path": "/app/pages/gallery",
					"menu_title": "sidebar.gallery"
				},
				{
					"path": "/app/pages/pricing",
					"menu_title": "sidebar.pricing"
				},
				{
					"path": "/app/pages/blank",
					"menu_title": "sidebar.blank"
				},
				{
					"path": "/terms-condition",
					"menu_title": "sidebar.terms&Conditions"
				},
				{
					"path": "/app/pages/feedback",
					"menu_title": "sidebar.feedback"
				},
				{
					"path": "/app/pages/report",
					"menu_title": "sidebar.report"
				},
				{
					"path": "/app/pages/faq",
					"menu_title": "sidebar.faq(s)"
				}
			]
		},
		{
			"menu_title": "sidebar.session",
			"menu_icon": "zmdi zmdi-time-interval",
			"child_routes": [
				{
					"path": "/session/login",
					"menu_title": "sidebar.login"
				},
				{
					"path": "/session/register",
					"menu_title": "sidebar.register"
				},
				{
					"path": "/session/lock-screen",
					"menu_title": "sidebar.lockScreen"
				},
				{
					"path": "/session/forgot-password",
					"menu_title": "sidebar.forgotPassword"
				},
				{
					"path": "/session/404",
					"menu_title": "sidebar.404"
				},
				{
					"path": "/session/500",
					"menu_title": "sidebar.500"
				}
			]
		}
	],

	category2: [
		{
			"menu_title": "sidebar.Users",
			"menu_icon": "zmdi zmdi-user",
			"child_routes": [
				{
					"menu_title": "sidebar.UserList",
					"path": "/sidemenu/tables/data-table",
				},
				{
					"menu_title": "sidebar.addUser",
					"path": "/sidemenu/addUser",
				}
			]
		}
	],
	category3: [
		{
			"menu_title": "sidebar.Groups",
			"menu_icon": "zmdi zmdi-users",
			"child_routes": [
				{
					"menu_title": "sidebar.groupsList",
					"path": "/sidemenu/groupsList",
				},
				{
					"menu_title": "sidebar.addNewGroup",
					"path": "/sidemenu/addNewGroup",
				}
			]
		}
	],
	category4: [
		{
			"menu_title": "sidebar.roles",
			"menu_icon": "zmdi zmdi-user",
			"child_routes": [
				{
					"menu_title": "sidebar.RoleList",
					"path": "/sidemenu/roleList",
				},
				{
					"menu_title": "sidebar.addNewRole",
					"path": "/sidemenu/addNewRole",
				},
			]
		}
	],
	category5: [
		{
			"menu_title": "sidebar.actions",
			"menu_icon": "zmdi zmdi-user",
			"child_routes": [
				{
					"menu_title": "sidebar.addNewAction",
					"path": "/sidemenu/addNewAction",
				},
				{
					"menu_title": "sidebar.ActionList",
					"path": "/sidemenu/actionList",
				}
			]
		}
	],
	category6: [
		{
			"menu_title": "sidebar.TagBulkOrder",
			"menu_icon": "zmdi zmdi-document",
			"child_routes": [
				{
					"menu_title": "sidebar.tagInventory",
					"path": "/sidemenu/tagInventory",
				},
				{
					"menu_title": "sidebar.NewtagBulkOrder",
					"path": "/sidemenu/tagBulkOrder",
				}
			]
		}
	],
	category7: [
		{
			"menu_title": "sidebar.TagRequest",
			"menu_icon": "zmdi zmdi-document",
			"child_routes": [
				{
					"menu_title": "sidebar.requestedTagsList",
					"path": "/sidemenu/requestedTagsList",
				}
			]
		}
	],
	category8: [
		{
			"menu_title": "sidebar.TagProvider",
			"menu_icon": "zmdi zmdi-document",
			"child_routes": [
				{
					"menu_title": "sidebar.tagProvidersList",
					"path": "/sidemenu/tagProvidersList",
				},
				{
					"menu_title": "sidebar.addTagProvider",
					"path": "/sidemenu/addTagProvider",
				}
			]
		}
	],
	category9: [
		{
			"menu_title": "sidebar.tagPackagesList",
			"menu_icon": "zmdi zmdi-dropbox",
			"path": "/sidemenu/tagPackagesList",
			"child_routes": null
		}
	]
	// category4: [
	// 	{
	// 		"menu_title": "sidebar.forms",
	// 		"menu_icon": "zmdi zmdi-file-text",
	// 		"child_routes": [
	// 			{
	// 				"path": "/app/forms/form-elements",
	// 				"menu_title": "sidebar.formElements"
	// 			},
	// 			{
	// 				"path": "/app/forms/text-field",
	// 				"menu_title": "sidebar.textField"
	// 			},
	// 			{
	// 				"path": "/app/forms/select-list",
	// 				"menu_title": "sidebar.selectList"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"menu_title": "sidebar.charts",
	// 		"menu_icon": "zmdi zmdi-chart-donut",
	// 		"child_routes": [
	// 			{
	// 				"path": "/app/charts/re-charts",
	// 				"menu_title": "sidebar.reCharts"
	// 			},
	// 			{
	// 				"path": "/app/charts/react-chartjs2",
	// 				"menu_title": "sidebar.reactChartjs2"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"menu_title": "sidebar.icons",
	// 		"menu_icon": "zmdi zmdi-star",
	// 		"child_routes": [
	// 			{
	// 				"path": "/app/icons/themify-icons",
	// 				"menu_title": "sidebar.themifyIcons"
	// 			},
	// 			{
	// 				"path": "/app/icons/simple-lineIcons",
	// 				"menu_title": "sidebar.simpleLineIcons"
	// 			},
	// 			{
	// 				"path": "/app/icons/material-icons",
	// 				"menu_title": "sidebar.materialIcons"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"menu_title": "sidebar.tables",
	// 		"menu_icon": "zmdi zmdi-grid",
	// 		"child_routes": [
	// 			{
	// 				"path": "/app/tables/basic",
	// 				"menu_title": "sidebar.basic"
	// 			},
	// 			{
	// 				"path": "/app/tables/data-table",
	// 				"menu_title": "sidebar.dataTable"
	// 			},
	// 			{
	// 				"path": "/app/tables/responsive",
	// 				"menu_title": "sidebar.responsive"
	// 			}
	// 		]
	// 	}
	// ],
	// category5: [
	// 	{
	// 		"menu_title": "sidebar.maps",
	// 		"menu_icon": "zmdi zmdi-map",
	// 		"child_routes": [
	// 			{
	// 				"path": "/app/maps/google-maps",
	// 				"menu_title": "sidebar.googleMaps"
	// 			},
	// 			{
	// 				"path": "/app/maps/leaflet-maps",
	// 				"menu_title": "sidebar.leafletMaps"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"menu_title": "sidebar.users",
	// 		"menu_icon": "zmdi zmdi-accounts",
	// 		"child_routes": [
	// 			{
	// 				"path": "/app/users/user-profile-1",
	// 				"menu_title": "sidebar.userProfile1"
	// 			},
	// 			{
	// 				"path": "/app/users/user-profile",
	// 				"menu_title": "sidebar.userProfile2"
	// 			},
	// 			{
	// 				"path": "/app/users/user-management",
	// 				"menu_title": "sidebar.userManagement"
	// 			},
	// 			{
	// 				"path": "/app/users/user-list",
	// 				"menu_title": "sidebar.userList"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"menu_title": "sidebar.calendar",
	// 		"menu_icon": "zmdi zmdi-calendar-note",
	// 		"child_routes": [
	// 			{
	// 				"path": "/app/calendar/basic",
	// 				"menu_title": "components.basic"
	// 			},
	// 			{
	// 				"path": "/app/calendar/cultures",
	// 				"menu_title": "sidebar.cultures"
	// 			},
	// 			{
	// 				"path": "/app/calendar/dnd",
	// 				"menu_title": "sidebar.dnd"
	// 			},
	// 			{
	// 				"path": "/app/calendar/selectable",
	// 				"menu_title": "sidebar.selectable"
	// 			},
	// 			{
	// 				"path": "/app/calendar/custom-rendering",
	// 				"menu_title": "sidebar.customRendering"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"menu_title": "sidebar.editor",
	// 		"menu_icon": "zmdi zmdi-edit",
	// 		"child_routes": [
	// 			{
	// 				"path": "/app/editor/wysiwyg-editor",
	// 				"menu_title": "sidebar.wysiwygEditor"
	// 			},
	// 			{
	// 				"path": "/app/editor/quill-editor",
	// 				"menu_title": "sidebar.quillEditor"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"menu_title": "sidebar.dragAndDrop",
	// 		"menu_icon": "zmdi zmdi-mouse",
	// 		"child_routes": [
	// 			{
	// 				"path": "/app/drag-andDrop/react-dragula",
	// 				"menu_title": "sidebar.reactDragula"
	// 			},
	// 			{
	// 				"path": "/app/drag-andDrop/react-dnd",
	// 				"menu_title": "sidebar.reactDnd"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"menu_title": "sidebar.multiLevel",
	// 		"menu_icon": "zmdi zmdi-view-web",
	// 		"child_routes": [
	// 			{
	// 				"menu_title": "sidebar.level1",
	// 				"child_routes": [
	// 					{
	// 						"path": "/app/level2",
	// 						"menu_title": "sidebar.level2"
	// 					}
	// 				]
	// 			}
	// 		]
	// 	},
	// ],
	// category6: [
	// 	{
	// 		"menu_title": "sidebar.imageCropper",
	// 		"menu_icon": "zmdi zmdi-crop",
	// 		"path": "/app/image-cropper",
	// 		"child_routes": null
	// 	},
	// 	{
	// 		"menu_title": "sidebar.videoPlayer",
	// 		"menu_icon": "zmdi zmdi-collection-video",
	// 		"path": "/app/video-player",
	// 		"child_routes": null
	// 	},
	// 	{
	// 		"menu_title": "sidebar.dropzone",
	// 		"menu_icon": "zmdi zmdi-dropbox",
	// 		"path": "/app/dropzone",
	// 		"child_routes": null
	// 	}
	// ]

}
