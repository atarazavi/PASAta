import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";
import IntlMessages from 'Util/IntlMessages';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import {formatResult} from '../../../helpers/helpers';
// import { makeStyles } from '@material-ui/core/styles';
// const data = [
//   ["Country", "Popularity"],
//   ["Germany", 200],
//   ["United States", 300],
//   ["Brazil", 400],
//   ["Canada", 500],
//   ["France", 600],
//   ["RU", 700]
// ];
// const useStyles = makeStyles(theme => ({
//     root: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'flex-end',
//     },
//     icon: {
//       margin: theme.spacing(2),
//     }
//     // iconHover: {
//     //   margin: theme.spacing(2),
//     //   '&:hover': {
//     //     color: red[800],
//     //   },
//     // },
//   }));


class TableData extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        paginateModel:props.paginateModel,
        dtos:props.dtos
    }
  }

  componentDidMount(){

    
  }


  componentWillReceiveProps(nextProps){

    this.setState((preve)=>{
        return {
            ...preve,
            paginateModel:nextProps.paginateModel,
            dtos:nextProps.dtos
        }
    })
  }


  render() {
    let productName=<IntlMessages id='dashbord.table.product.name' />;
    let productOwner=<IntlMessages id="dashbord.table.product.owner"/>;
    let productGroup=<IntlMessages id="dashbord.table.product.group"/>;
    let productTime=<IntlMessages id="dashbord.table.time.authenticate"/>;
    let productPlace=<IntlMessages id="dashbord.table.place.authenticate"/>;
    const columns = [{name:<IntlMessages id='dashbord.result' />,label:'result'},{name:productName,label:'productName'},
                     {name:productOwner,label:'productOwner'},
                     {name:productGroup,label:'productGroup'},
                     {name:productTime,lable:'productTime'},
                     {name:productPlace,label:'productPlace'},
                     ""
                    ];
    const data = this.filterData(this.props.dtos);

    const options = {
        filterType: 'textField',
        print:false,
        download:false,
        viewColumns:false,
        searchable:false,
        filter:false,
        selectableRows: false,
        sort:false,
        rowsPerPage:5,
        hint:"hint"
    };

    return (
        <MUIDataTable
            title={<IntlMessages id='dashbord.table.name' />}
            data={data}
            columns={columns}
            options={options}
        />)
  }


  filterData(items){
    // const classes = useStyles();

      let result = [];
    for(var item of items){
        let arrRow = [];
        let color = formatResult(item.tap_result)[1];
        let tooltipDesc = formatResult(item.tap_result)[0];
        arrRow.push(
            (<Tooltip title={tooltipDesc} aria-label="Add">
                <Icon style={{ color: color,fontSize:28}}>brightness_1</Icon>
            </Tooltip>
            ) 
            
        );
        arrRow.push(item.product_type_name);
        arrRow.push(item.product_manufacturer_title);
        arrRow.push(item.product_industry_title);
        arrRow.push(item.tap_datetime);
        arrRow.push(item.gis_country_title + "-"+item.gis_province_title+"-"+item.gis_city_title );
        arrRow.push(<Link to={"/sidemenu/product/"+item.tap_id} ><IntlMessages id='dashbord.description' /></Link>);
        result.push(arrRow);
    }
    console.info("result of iterable is ",items);
    return result;
  }

  getTapResult(tap_result){
    if(tap_result === "AUTHENTICATION_SUCCESSFUL"){
        return "green";
    }else if(tap_result ==="TAG_NOT_FOUND"){
        return "gray";
    }else if(tap_result ==="TAG_NOT_ASSIGN_TO_PRODUCT"){
        return "orange";
    }
    else if(tap_result ==="TAG_RIPPED"){
        return "darkred";
    }
    else{
        return "red";
    }
  }
}



export default TableData;