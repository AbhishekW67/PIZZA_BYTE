"use client";
import SideBar from '@/components/admin/SideBar'
import {useState} from 'react'
import Dashboard from '@/components/admin/Dashboard';
import Users from '@/components/admin/Users';
import Products from '@/components/admin/Products';
import Orders from '@/components/admin/Orders';

export default function page() {
    const [tab , setTab] = useState('dashboard')
    return (
        <SideBar setTab={setTab} tab={tab}>
            {tab === 'dashboard' && <Dashboard />}
            {tab === 'users' && <Users />}
            
            {tab === 'products' && <Products />}
            {tab === 'orders' && <Orders />}
        </SideBar>
    )
}
