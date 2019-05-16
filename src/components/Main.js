import React, { Component } from 'react';
import meterData from '../utils/meterlist.json'
import {list_of_obj_val, remove_dublicate, filter_by_value} from '../utils/globalFunctions'
import axios from 'axios'
import * as Data from '../utils/data'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import '../css/site.css'



class Main extends Component {
  constructor(props){
    super(props)
    this.state={
      meterID_list : Data.non_dublicate_list_of_meterID_in_data,
      selected_meterID : "",
      baseLoad_data : [],
      WSL_data: [],
      TSL_data : []
    }
  }
  getKWhData = (meterID) =>{
    console.log(meterID)
    let list_by_meterID_baseload = Data.get_all_obj_by_type(Data.meterID[meterID], 'Type' , 'BaseLoad');
    let kWh_data_baseload = Data.get_kWh_by_type(list_by_meterID_baseload);
    this.setState({ baseLoad_data:  kWh_data_baseload});

    let list_by_meterID_TSL = Data.get_all_obj_by_type(Data.meterID[meterID], 'Type' , 'TSL');
    let kWh_data_TSL = Data.get_kWh_by_type(list_by_meterID_TSL);
    this.setState({ TSL_data:  kWh_data_TSL});

    let list_by_meterID_WSL = Data.get_all_obj_by_type(Data.meterID[meterID], 'Type' , 'WSL');
    let kWh_data_WSL = Data.get_kWh_by_type(list_by_meterID_WSL);
    this.setState({ WSL_data:  kWh_data_WSL});

  }
  handleChange = (event) => {
    console.log(event.target.value)
        this.setState({ selected_meterID: event.target.value }, ()=>{
            this.getKWhData(this.state.selected_meterID);
        })

    }

  render() {

    const options = {
      title: {
        text: 'Energy Consumption',
      },
      xAxis: {
           type: 'datetime',
          max: Date.UTC(2018, 3, 17),
           tickInterval: 3600 * 1000 * 24,

      },
      yAxis: {
        title: {
          text: 'kWh',
        },

      },

      plotOptions: {
        series: {
          pointStart: Date.UTC(2018, 2, 27, 0 , 0),
          pointInterval: 3600 * 1000, // one hour
           tooltip: {
            valueDecimals: 2,
            valueSuffix: 'kWh',

        },

       },
       area: {

           marker: {
               enabled: false,
               symbol: 'circle',
               radius: 2,
               states: {
                   hover: {
                       enabled: true
                   }
               }
           }
       }
   },
      chart: {
        type: 'area',
        height: 500,
        zoomType: 'x',

      },

      rangeSelector: {
      allButtonsEnabled: true,
            buttons: [
              {
                type: 'day',
                count: 3,
                text: '3d',
                forced: true
            }, {
                type: 'week',
                count: 1,
                text: '1w'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }, {
                type: 'all',
                text: 'All'
            }],
            selected: 3
        },


      series: [
        {    name: 'BaseLoad',
            data: this.state.baseLoad_data
        },
        {    name: 'WSL',
              data: this.state.WSL_data
        },
        {    name: 'TSL',
            data: this.state.TSL_data

        },

      ],
    };
    let menuItems = this.state.meterID_list.map((each, index)=>{
      return  <option key = {index} value = {each}> Meter ID: { each }</option>
    })




    return (
      <div className="App">

      <select id="dropdownMeterId" onChange={this.handleChange} >
      {menuItems}
      </select>
      <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options} />
      </div>
    );
  }
}



export default Main;
