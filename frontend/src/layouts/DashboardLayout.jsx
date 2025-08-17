import React, { useState } from 'react'
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  BookOutlined,
  TeamOutlined,
  SettingOutlined,
  FileTextOutlined,
  TrophyOutlined,
  CalendarOutlined,
  BarChartOutlined,
} from '@ant-design/icons'
import { logout } from '../redux/slices/authSlice.js'
import { selectUser, selectRoles } from '../redux/slices/authSlice.js'
import { toggleSidebar, selectSidebarCollapsed } from '../redux/slices/uiSlice.js'

const { Header, Sider, Content } = Layout

const DashboardLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  
  const user = useSelector(selectUser)
  const roles = useSelector(selectRoles)
  const sidebarCollapsed = useSelector(selectSidebarCollapsed)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/auth/login')
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profil',
      onClick: () => navigate('/dashboard/profile')
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Déconnexion',
      onClick: handleLogout
    }
  ]

  // Menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      {
        key: '/dashboard/employee',
        icon: <DashboardOutlined />,
        label: 'Tableau de bord',
        onClick: () => navigate('/dashboard/employee')
      },
      {
        key: '/dashboard/employee/mes-formations',
        icon: <BookOutlined />,
        label: 'Mes Formations',
        onClick: () => navigate('/dashboard/employee/mes-formations')
      },
      {
        key: '/dashboard/employee/demande-formation',
        icon: <FileTextOutlined />,
        label: 'Demande Formation',
        onClick: () => navigate('/dashboard/employee/demande-formation')
      }
    ]

    // Add role-specific items
    if (roles.includes('RRH')) {
      baseItems.push(
        {
          key: '/dashboard/rrh',
          icon: <TeamOutlined />,
          label: 'Gestion RH',
          onClick: () => navigate('/dashboard/rrh')
        },
        {
          key: '/dashboard/budget',
          icon: <BarChartOutlined />,
          label: 'Budget',
          onClick: () => navigate('/dashboard/budget')
        }
      )
    }

    if (roles.includes('RF')) {
      baseItems.push(
        {
          key: '/dashboard/rf',
          icon: <CalendarOutlined />,
          label: 'Planification',
          onClick: () => navigate('/dashboard/rf')
        }
      )
    }

    if (roles.includes('ADMIN')) {
      baseItems.push(
        {
          key: '/dashboard/admin',
          icon: <SettingOutlined />,
          label: 'Administration',
          onClick: () => navigate('/dashboard/admin')
        }
      )
    }

    return baseItems
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={sidebarCollapsed}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h2 style={{ 
            color: '#3498db', 
            margin: 0,
            fontSize: sidebarCollapsed ? '16px' : '20px'
          }}>
            {sidebarCollapsed ? 'EHC' : 'EHC Training'}
          </h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={getMenuItems()}
          style={{ borderRight: 0 }}
        />
      </Sider>
      
      <Layout>
        <Header style={{ 
          padding: '0 16px', 
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => dispatch(toggleSidebar())}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#666' }}>
              Bienvenue, {user?.firstName || 'Utilisateur'}
            </span>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Avatar 
                icon={<UserOutlined />} 
                style={{ cursor: 'pointer' }}
              />
            </Dropdown>
          </div>
        </Header>
        
        <Content style={{ 
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          borderRadius: 8,
          minHeight: 280
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
