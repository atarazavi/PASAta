import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";
import IntlMessages from 'Util/IntlMessages';
import Icon from '@material-ui/core/Icon';
// const data = [
//   ["Country", "Popularity"],
//   ["Germany", 200],
//   ["United States", 300],
//   ["Brazil", 400],
//   ["Canada", 500],
//   ["France", 600],
//   ["RU", 700]
// ];
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
    const columns = [{name:'result',label:'result'},{name:productName,label:'productName'},
                     {name:productOwner,label:'productOwner'},
                     {name:productGroup,label:'productGroup'},
                     {name:productTime,lable:'productTime'},
                     {name:productPlace,label:'productPlace'}
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
        rowsPerPage:5
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
      let result = [];
    for(var item of items){
        let arrRow = [];
        arrRow.push(<i className="zmdi-hc-li zmdi zmdi-check-square"></i>);
        arrRow.push(item.product_type_name);
        arrRow.push(item.product_manufacturer_title);
        arrRow.push(item.product_industry_title);
        arrRow.push(item.tap_datetime);
        arrRow.push(item.gis_country_title + "-"+item.gis_province_title+"-"+item.gis_city_title );
        result.push(arrRow);
    }
    console.info("result of iterable is ",items);
    return result;
  }
}

export default TableData;