import React from 'react'
import { Route, Routes } from 'react-router-dom';
import UserMenu from './UserMenu';
import Login from './Login';
import Register from './Register'
import MockOrder from './MockOrder';
import Protected from './ProtectedRoute';
import AdminOrders from './AdminOrders';
import OrderSummary from './OrderSummary';
import UserOrderMeal from './UserOrderMeal';
import TableLogin from './TableLogin';
import ProtectedTables from './ProtectedTables';
import AdminMenu from './AdminMenu';
import AdminDashboard from './AdminDashboard';

function Main() {
  return (
    <main>
      <Routes>
      <Route path="/" element={<ProtectedTables />}>
        <Route path="" element={<UserMenu />} />
        <Route path="/user/order/summary" element={<OrderSummary />} />
        <Route path="/user/order/meal/:id" element={<UserOrderMeal />} />
      </Route>
      <Route path="/loginTable/:_id/:tableNumber/:restaurantId" element={<TableLogin />} />
      <Route path="/loginTable" element={<TableLogin />} />

      <Route path="/" element={<Protected />}>
      <Route path="" element={<AdminMenu />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="/login" element ={<Login />} />
      <Route path="/register" element ={<Register />} />
      </Routes>
    </main>

    
  )
}

export default Main