"use client"

import type React from "react"
import { useState } from "react"
import { Layout, Menu, Avatar, Dropdown, Button, theme } from "antd"
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  TeamOutlined,
  BookOutlined,
  BarChartOutlined,
  BankOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import { useRouter, usePathname } from "next/navigation"

const { Header, Sider, Content } = Layout
const { useToken } = theme

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "admin" | "superadmin" | "rrh" | "rf" | "manager" | "employee" | "formateur" | "organisme" | "directeur"
  userName?: string
  userAvatar?: string
}

export default function DashboardLayout({
  children,
  userRole,
  userName = "Admin EHC",
  userAvatar,
}: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const { token } = useToken()
  const router = useRouter()
  const pathname = usePathname()

  const handleMenuClick = ({ key }: { key: string }) => {
    const routes: Record<string, string> = {
      dashboard: `/${userRole}/dashboard`,
      "clients-list": `/${userRole}/clients`,
      "clients-add": `/${userRole}/clients/add`,
      "prospection-devis": `/${userRole}/prospection-devis`,
      contrats: `/${userRole}/contrats`,
      "informations-clients": `/${userRole}/informations-clients`,
      "suivi-commercial": `/${userRole}/suivi-commercial`,
      "gestion-paiements": `/${userRole}/gestion-paiements`,
      "system-settings": `/${userRole}/settings`,
      "system-users": `/${userRole}/users`,
      reports: `/${userRole}/reports`,
      budget: `/${userRole}/budget`,
      organization: `/${userRole}/organization`,
      "training-catalog": `/${userRole}/training-catalog`,
      participants: `/${userRole}/participants`,
    }

    if (routes[key]) {
      router.push(routes[key])
    }
  }

  const getCurrentMenuKey = () => {
    if (pathname.includes("/contrats")) return ["contrats"]
    if (pathname.includes("/prospection-devis")) return ["prospection-devis"]
    if (pathname.includes("/informations-clients")) return ["informations-clients"]
    if (pathname.includes("/suivi-commercial")) return ["suivi-commercial"]
    if (pathname.includes("/gestion-paiements")) return ["gestion-paiements"]
    if (pathname.includes("/clients")) return ["clients-list"]
    if (pathname.includes("/dashboard")) return ["dashboard"]
    return ["dashboard"]
  }

  // Menu items based on user role
  const getMenuItems = (): MenuProps["items"] => {
    const baseItems = [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: "Tableau de bord",
      },
    ]

    const roleSpecificItems: Record<string, MenuProps["items"]> = {
      admin: [
        {
          key: "clients",
          icon: <TeamOutlined />,
          label: "Gestion Clients",
          children: [
            { key: "clients-list", label: "Liste des clients" },
            { key: "clients-add", label: "Ajouter client" },
          ],
        },
        {
          key: "system",
          icon: <SettingOutlined />,
          label: "Configuration Système",
          children: [
            { key: "system-settings", label: "Paramètres généraux" },
            { key: "system-users", label: "Utilisateurs système" },
          ],
        },
        {
          key: "reports",
          icon: <BarChartOutlined />,
          label: "Rapports Globaux",
        },
      ],
      superadmin: [
        {
          key: "clients",
          icon: <TeamOutlined />,
          label: "Gestion Clients",
          children: [
            { key: "clients-list", label: "Liste des clients" },
            { key: "clients-add", label: "Ajouter client" },
            { key: "informations-clients", label: "Informations Clients" },
            { key: "suivi-commercial", label: "Suivi Commercial" },
            { key: "gestion-paiements", label: "Gestion Paiements" },
            { key: "prospection-devis", label: "Prospection & Devis" },
            { key: "contrats", label: "Contrats" },
          ],
        },
        {
          key: "configuration",
          icon: <SettingOutlined />,
          label: "Configuration S...",
          children: [
            { key: "system-settings", label: "Paramètres généraux" },
            { key: "integrations", label: "Intégrations" },
            { key: "security", label: "Sécurité" },
          ],
        },
        {
          key: "reports",
          icon: <BarChartOutlined />,
          label: "Rapports Globaux",
        },
      ],
      rrh: [
        {
          key: "budget",
          icon: <BankOutlined />,
          label: "Gestion Budget",
        },
        {
          key: "organization",
          icon: <TeamOutlined />,
          label: "Gestion Organisation",
        },
        {
          key: "training-catalog",
          icon: <BookOutlined />,
          label: "Catalogue Formation",
        },
        {
          key: "participants",
          icon: <UserOutlined />,
          label: "Gestion Participants",
        },
      ],
    }

    return [...baseItems, ...(roleSpecificItems[userRole] || [])]
  }

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Mon Profil",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Paramètres",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Déconnexion",
      danger: true,
    },
  ]

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorder}`,
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: `1px solid ${token.colorBorder}`,
            fontWeight: "bold",
            fontSize: collapsed ? 14 : 16,
            color: token.colorPrimary,
          }}
        >
          {collapsed ? "EHC" : "EHC SIRH"}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          selectedKeys={getCurrentMenuKey()}
          items={getMenuItems()}
          style={{ borderRight: 0 }}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 16, width: 64, height: 64 }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button type="text" icon={<BellOutlined />} />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 8 }}>
                <Avatar src={userAvatar} icon={<UserOutlined />} />
                <span>{userName}</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: 16,
            padding: 24,
            background: token.colorBgContainer,
            borderRadius: token.borderRadius,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
