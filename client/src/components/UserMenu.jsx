

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from './Context';
/*import axios from 'axios';*/

import UserOrderMeal from './UserOrderMeal';
import mockData from '../assets/mockData.json';
import { FaChevronDown } from 'react-icons/fa';
import './UserMenu.css';

const UserMenu = () => {

  console.log("UserMenu component mounted");

  const { userMenu, setUserMenu, selectedItem, updateSelectedItem, updateOrderItems } = useAppContext();
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  useEffect(() => {
    /* axios
     .get("/api/usermenu")
     .then(res => {
      setUserMenu(res.data);
      setLoading(false);
     })
     .catch(e => {
      console.error(e);
      setLoading(false);
  });*/
  
  // Set usermenu state with the mock data
 
  setUserMenu(mockData);
  
}, []);
    

const handleAccordionClick = (item) => {
    updateSelectedItem(item);
    setIsAccordionExpanded((prev) => !prev);
  };

const handleAdd = (item) => {
    updateOrderItems(item);
  };

const handleRemove = (item) => {
    updateOrderItems(item);
  };

  
return (     

  <div className="user-menu-container mx-auto px-2 rounded-xl m-2 shadow-[10px_20px_10px_-2px_rgba(0,0,0,0.15),-6px_-6px_10px_-2px_rgba(255,255,255,0.8)] overflow-auto flex items-center">
    <h2 className="menu-title">Menu</h2>
    <div className="menu-items rounded-xl m-2 space-x-2 space-y-2 justify-center">
    {userMenu.map((item) => (
      <div key={item.id}>
        
        <button
         type="button"
          className="menu-item menu-item-hover relative shadow-[10px_20px_10px_-2px_rgba(0,0,0,0.15),-6px_-6px_10px_-2px_rgba(255,255,255,0.8)] rounded-xl justify-center text-black flex-col w-full m-2 sm:m-4 lg:m-6 justify-between mr-2"
          onClick={() => handleAccordionClick(item)}
         >
            <span style={{ fontFamily: "'Merienda', cursive" }}>{item.name}</span>
             
            <div className="arrow-icon-container transform-gpu text-xs sm:text-sm md:text-base lg:text-lg my-1 sm:my-2 md:my-3 lg:my-4" style={{ transform: `rotate(${selectedItem && selectedItem.id === item.id ? '180deg' : '0'})` }}>
            <FaChevronDown />
            </div>

             {selectedItem && selectedItem.id === item.id && (
             <div className="meal-details relative m-2 flex-col w-full overflow-y-auto">
               <p>{selectedItem.content}</p>
               <p>Price: ${selectedItem.price.toFixed(2)}</p>
               <UserOrderMeal
                item={selectedItem}
                onAdd={() => handleAdd(selectedItem)}
                onRemove={() => handleRemove(selectedItem)}
                name={selectedItem.name}
                content={selectedItem.content}
                price={selectedItem.price}
               
                />
               </div>
              )}

            </button> 
        </div>
        ))}

  <script type="module" src="../src/assets"></script>
  <script noModule src="../src/assets"></script>

      </div>
      <Link to="./OrderSummary">
      <button className="order-summary-button shadow-[10px_20px_10px_-2px_rgba(0,0,0,0.15),-6px_-6px_10px_-2px_rgba(255,255,255,0.8)] text-black flex-col w-full rounded-xl"
        style={{ fontFamily: "'Merienda', cursive" }}>See your order summary</button>
       </Link>
      </div>
  );
};

export default UserMenu
