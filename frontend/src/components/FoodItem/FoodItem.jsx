import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext';
function FoodItem({id,name,description,image,price}) {
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img src={url+'/images/'+image} alt="" className="food-item-image" />
            {
                !cartItems[id] ? 
                <img src={assets.add_icon_white} className='add' onClick={()=>addToCart(id)}></img> 
                : <div className='food-item-counter'>
                    <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                    <p>{cartItems[id]}</p>
                    <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
                </div> 
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">
                {description}
            </p>
            <p className="food-item-price">
                ${price}
            </p>
        </div>
        <img src={assets.facebook_icon} alt="hello" />
      
    </div>
  )
}

export default FoodItem
