import React from 'react'
import { Route, Routes } from 'react-router-dom';
import UserMenu from './UserMenu';
import Login from './Login';
import Register from './Register'
import Protected from './ProtectedRoute';
import AdminOrders from './AdminOrders';
import OrderSummary from './OrderSummary';
import UserOrderMeal from './UserOrderMeal';
import TableLogin from './TableLogin';
import ProtectedTables from './ProtectedTables';
import AdminMenu from './AdminMenu';
import AdminNewMeal from './AdminNewMeal';
import AdminDashboard from './AdminDashboard';
import MyRestaurant from './MyRestaurant';
import UserConfirmation from './UserConfirmation';
import AdminTables from './AdminTables';
import AdminAddTable from './AdminAddTable';
import UserMealDetails from './UserMealDetails';
import AdminOrderDetails from './AdminOrderDetails';
import AdminMealDetails from './AdminMealDetails';

function Main() {
  return (
    <main>
      <Routes>
      <Route path="/user" element={<ProtectedTables />}>
        <Route path="" element={<UserMenu />} />
        <Route path="order/summary" element={<OrderSummary />} />
        <Route path="order/confirmation" element={<UserConfirmation />} />
        <Route path="order/meal/:id" element={<UserMealDetails />} />
      </Route>
      <Route path="/loginTable/:_id/:tableNumber/:restaurantId" element={<TableLogin />} />

      <Route path="/" element={<Protected />}>
      <Route path="" element={<AdminOrders />} />
      <Route path="admin/menu" element={<AdminMenu />} />
      <Route path="admin/menu/:id" element={<AdminMealDetails />} />
      <Route path="admin/dashboard" element={<AdminDashboard />} /> 
      <Route path="admin/newmeal" element={<AdminNewMeal />} />  
      <Route path="admin/restaurant" element ={<MyRestaurant />} />
      <Route path="admin/tables" element={<AdminTables />} />
      <Route path="admin/addtable" element={<AdminAddTable />} />
      <Route path="admin/order/:id" element ={<AdminOrderDetails />} />
      </Route>
      <Route path="/login" element ={<Login />} />
      <Route path="/register" element ={<Register />} />
      </Routes>
    </main>

    
  )
}

export default Main