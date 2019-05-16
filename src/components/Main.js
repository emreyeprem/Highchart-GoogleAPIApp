import React, { Component } from 'react';
import meterData from '../utils/meterlist.json'
import {list_of_obj_val, remove_dublicate, filter_by_value} from '../utils/globalFunctions'
import axios from 'axios'
import * as Data from '../utils/data'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import '../css/site.css'

let list_by_meterID_baseload = Data.get_all_obj_by_type(Data.meterID['1111405'], 'Type' , 'BaseLoad');
Data.get_kWh_by_type(list_by_meterID_baseload)

console.log(Data.non_dublicate_list_of_meterID_in_data)


class Main extends Component {
  constructor(props){
    super(props)
    this.state={
      meterID_list : Data.non_dublicate_list_of_meterID_in_data
    }
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

        },
        {    name: 'WSL',


        },
        {    name: 'TSL',


        },

      ],
    };
    let menuItems = this.state.meterID_list.map((each)=>{
      return  <option value = {each}>{ each }</option>
    })
    return (
      <div className="App">

      <select id="dropdownMeterId">
      <option selected>Select a meter ID &#9660;</option>
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
