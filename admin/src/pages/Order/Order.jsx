import React from 'react'
import './Order.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import {assets} from '../../assets/assets.js'
const Order = ({url}) => {
  const [data,setData] = useState([]);

  const fetchOrders = async ()=>{
    let response = await axios.get(url+'/api/order/list');
    if(response.data.success){
      setData(response.data.data);
    }else{
      toast.error("Error");
    }
  }
  const statusHandler = async (event,orderId)=>{
    const response = await axios.post(url+"/api/order/status",{orderId,
    status:event.target.value
    })

    if(response.data.success){
      await fetchOrders();
    }
  }
  useEffect(()=>{
    fetchOrders();
  },[])
  return (
    
    <div className='order add'>
      <h3>Orders page</h3>
      <div className="order-list">
        {data.map((data,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {data.items.map((item,index)=>{
                   if(index === data.items.length -1){
                      return item.name+" x " + item.quantity
                   }else{
                    return item.name+" x "+item.quantity+", "
                   }
                })}
              </p>
              <p className="order-item-name">
                {data.address.firstName +" "+data.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{data.address.street+","}</p>
                <p>{data.address.city+", "+data.address.state+", "+data.address.country+", "+data.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{data.address.phone}</p>
              </div>
              <p>Items:{data.items.length}</p>
              <p>$ <b>{data.amount}</b></p>
              <select value={data.status}onChange={(event)=>{statusHandler(event,data._id)}}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
