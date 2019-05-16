
// list of values of given key from each objects in an array
function list_of_obj_val(array, key){
  let list = array.map((each)=>{
    return each[key]
  })
  return list
}
// remove double values from an array
function remove_dublicate(array){
  let list_of_non_dublicate = [];
  array.forEach((each)=>{
      if(list_of_non_dublicate.includes(each)===false){
        list_of_non_dublicate.push(each)
      }
  })
  return list_of_non_dublicate
}
// filter an array by a given key value
function filter_by_value(array, key , value){
  let filtered_array = array.filter((each)=>{
    return each[key]=== value
  })
  return filtered_array
}
// sort an array of objects by a key value
//function sort_by_value(array, )






export {
   list_of_obj_val,
   remove_dublicate,
   filter_by_value
}
