import meterData from './meterlist.json';
import * as Function from './globalFunctions';

// get values of 'Date' key from each object in meterData array
let list_of_date_in_data = Function.list_of_obj_val(meterData, 'Date');

// non_dublicate_list_of_date_in_data includes 30 days starting from '2018-03-27' and ending at '2018-04-26'
// No dublicates
let non_dublicate_list_of_date_in_data = Function.remove_dublicate(list_of_date_in_data);

// get values of 'Meter_ID' key from each object in meterData array
let list_of_meterID_in_data = Function.list_of_obj_val(meterData, 'Meter_ID');

// non_dublicate_list_of_meterID_in_data includes 8 meter ids
// No dublicates
let non_dublicate_list_of_meterID_in_data = Function.remove_dublicate(list_of_meterID_in_data);


// this array consists of key value pairs
// Each key represents meter id
// Each value of meter id is array of objects
let meterID = []
non_dublicate_list_of_meterID_in_data.forEach((each)=>{
  meterID[each] =  Function.filter_by_value(meterData, 'Meter_ID', each);
})

//get all objects in an array of a specific meter id(key_of_outer_array) and sort it by data types
//Those data types are BaseLoad, WSL, TSL which are represented by the parameter value_of_inner_array
//key_of_inner_array is 'Type'
function get_all_obj_by_type(key_of_outer_array, key_of_inner_array, value_of_inner_array){

  let meterID_by_type = Function.filter_by_value(key_of_outer_array, key_of_inner_array , value_of_inner_array)
  console.log(meterID_by_type)
  return meterID_by_type
}

// getting 24 hour data from each object in meterID_by_type array and pushing all data to an array
function get_kWh_by_type(meterID_by_type){
  let kWh_list_by_type = []
   for(let i = 1; i < 25; i++){
     meterID_by_type.forEach((each) =>{
       kWh_list_by_type.push(each[i])
     })
   }
   console.log(kWh_list_by_type)
   return kWh_list_by_type
}

export{
  get_all_obj_by_type,
  get_kWh_by_type,
  meterID,
  non_dublicate_list_of_meterID_in_data,
}
