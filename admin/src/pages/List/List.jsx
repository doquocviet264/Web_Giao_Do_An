import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify";
const List = ({url}) => {

const[list, setList] = useState([]);

const fetchList = async()=>{
  const reponse = await axios.get(`${url}/api/food/list`)
  if(reponse.data.success){
    setList(reponse.data.data)
  }
  else{
    toast.error("Error")
  }
}
const removeFood =async(foodId)=>{
  const reponse = await axios.post(`${url}/api/food/remove`, {id:foodId})
  await fetchList();
  if(reponse.data.success){
    toast.success(reponse.data.message)
  }
  else{
    toast.error("ERROR")
  }
}


useEffect(()=>{
  fetchList();
},[])

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
<b>Image</b>
<b>Name</b>
<b>Category</b> 
<b>Price</b>
<b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
