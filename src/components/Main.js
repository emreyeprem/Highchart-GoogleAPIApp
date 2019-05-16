import React, { Component } from 'react';
import meterData from '../utils/meterlist.json'
import {list_of_obj_val, remove_dublicate, filter_by_value} from '../utils/globalFunctions'
import axios from 'axios'
import Chart from './Chart'
import moment from 'moment'
import Highcharts from 'highcharts';

let list_of_date_in_data = list_of_obj_val(meterData, 'Date');
// non_dublicate_list_of_date_in_data includes 30 days starting from '2018-03-27' and ending at '2018-04-26'
// By the reference of non_dublicate_list_of_date_in_data below
let non_dublicate_list_of_date_in_data = remove_dublicate(list_of_date_in_data);

let list_of_meterID_in_data = list_of_obj_val(meterData, 'Meter_ID');
// non_dublicate_list_of_meterID_in_data includes 8 meter ids with no dublicates
// By the reference of non_dublicate_list_of_meterID_in_data below
let non_dublicate_list_of_meterID_in_data = remove_dublicate(list_of_meterID_in_data);
//console.log(non_dublicate_list_of_meterID_in_data)

// this arrays includes the array of objects keyed by meter id.
let meterID = []
non_dublicate_list_of_meterID_in_data.forEach((each)=>{
  meterID[each] =  filter_by_value(meterData, 'Meter_ID', each);
  //console.log(meterID[each])
})
//meterID['1111405'] represents an array of objects for 3 types of data
// meterID_1111405_by_baseload is filtered form of meterID['1111405'] and is an array of objects with type 'BaseLoad'
let meterID_1111405_by_baseload = filter_by_value(meterID['1111405'], 'Type' , 'BaseLoad')
// getting 24 hour data from each object in meterID_1111405_by_baseload array and pushing all data to an array
let kWh_list_1111405_baseload = []
 for(let i = 1; i < 25; i++){
   meterID_1111405_by_baseload.forEach((each) =>{
     kWh_list_1111405_baseload.push(each[i])
   })
 }

let meterID_1111405_by_WSL = filter_by_value(meterID['1111405'], 'Type' , 'WSL')
// getting 24 hour data from each object in meterID_1111405_by_WSL array and pushing all data to an array
let kWh_list_1111405_WSL = []
 for(let i = 1; i < 25; i++){
   meterID_1111405_by_WSL.forEach((each) =>{
     kWh_list_1111405_WSL.push(each[i])
   })
 }
let meterID_1111405_by_TSL = filter_by_value(meterID['1111405'], 'Type' , 'TSL')
// getting 24 hour data from each object in meterID_1111405_by_TSL array and pushing all data to an array
let kWh_list_1111405_TSL = []
 for(let i = 1; i < 25; i++){
   meterID_1111405_by_TSL.forEach((each) =>{
     kWh_list_1111405_TSL.push(each[i])
   })
 }



class Main extends Component {
  render() {
    const options = {
      title: {
        text: 'Fruit Consumption',
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

      rangeSelector: {

            buttons: [{
                type: 'day',
                count: 3,
                text: '3d'
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
                type: 'year',
                count: 1,
                text: '1y'
            }, {
                type: 'all',
                text: 'All'
            }],
            selected: 3
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
      },
      series: [
        {    name: 'BaseLoad',
            data: kWh_list_1111405_baseload,

        },
        {    name: 'WSL',
            data: kWh_list_1111405_WSL,

        },
        {    name: 'TSL',
            data: kWh_list_1111405_TSL,

        },

      ],
    };

    return (
      <div className="App">
        <Chart options={options} />
      </div>
    );
  }
}



export default Main;
