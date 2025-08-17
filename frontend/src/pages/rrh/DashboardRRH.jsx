import React, { useState, useEffect } from 'react'
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Table, 
  Button, 
  Tag, 
  Progress, 
  Space,
  Typography,
  Avatar,
  List,
  Badge,
  Calendar,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message
} from 'antd'
import { 
  TeamOutlined, 
  BookOutlined, 
  DollarOutlined, 
  TrophyOutlined,
  UserAddOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BarChartOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select

const DashboardRRH = () => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [form] = Form.useForm()

  // Mock data
  const [stats, setStats] = useState({
    totalEmployees: 156,
    activeTrainings: 23,
    totalBudget: 850000,
    completedTrainings: 89
  })

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Ahmed Benali',
      department: 'IT',
      position: 'Développeur Senior',
      email: 'ahmed.benali@ehc.com',
      status: 'active',
      lastTraining: '2024-01-15',
      trainingCount: 5
    },
    {
      id: 2,
      name: 'Fatima Zahra',
      department: 'RH',
      position: 'Responsable RH',
      email: 'fatima.zahra@ehc.com',
      status: 'active',
      lastTraining: '2024-01-10',
      trainingCount: 3
    }
  ])

  const [budgetData, setBudgetData] = useState([
    {
      id: 1,
      category: 'Formations Techniques',
      allocated: 300000,
      spent: 180000,
      remaining: 120000
    },
    {
      id: 2,
      category: 'Formations Management',
      allocated: 200000,
      spent: 95000,
      remaining: 105000
    },
    {
      id: 3,
      category: 'Formations Soft Skills',
      allocated: 150000,
      spent: 75000,
      remaining: 75000
    }
  ])

  const employeeColumns = [
    {
      title: 'Employé',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {text.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      )
    },
    {
      title: 'Département',
      dataIndex: 'department',
      key: 'department',
      render: (dept) => <Tag color="blue">{dept}</Tag>
    },
    {
      title: 'Poste',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'active' ? 'success' : 'default'} 
          text={status === 'active' ? 'Actif' : 'Inactif'} 
        />
      )
    },
    {
      title: 'Dernière Formation',
      dataIndex: 'lastTraining',
      key: 'lastTraining',
      render: (date) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" size="small" icon={<EyeOutlined />}>
            Voir
          </Button>
          <Button size="small" icon={<EditOutlined />}>
            Modifier
          </Button>
        </Space>
      )
    }
  ]

  const budgetColumns = [
    {
      title: 'Catégorie',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Budget Alloué',
      dataIndex: 'allocated',
      key: 'allocated',
      render: (amount) => `${amount.toLocaleString()} DHS`
    },
    {
      title: 'Dépensé',
      dataIndex: 'spent',
      key: 'spent',
      render: (amount) => `${amount.toLocaleString()} DHS`
    },
    {
      title: 'Restant',
      dataIndex: 'remaining',
      key: 'remaining',
      render: (amount) => `${amount.toLocaleString()} DHS`
    },
    {
      title: 'Progression',
      key: 'progress',
      render: (_, record) => (
        <Progress 
          percent={Math.round((record.spent / record.allocated) * 100)} 
          size="small"
          status={record.spent > record.allocated * 0.9 ? 'exception' : 'active'}
        />
      )
    }
  ]

  const onFinish = (values) => {
    message.success('Budget mis à jour avec succès!')
    setModalVisible(false)
    form.resetFields()
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Tableau de Bord RH
      </Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Employés"
              value={stats.totalEmployees}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Formations Actives"
              value={stats.activeTrainings}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Budget Total"
              value={stats.totalBudget}
              prefix={<DollarOutlined />}
              suffix="DHS"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Formations Terminées"
              value={stats.completedTrainings}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Employees Management */}
        <Col xs={24} lg={16}>
          <Card 
            title="Gestion des Employés" 
            extra={
              <Button type="primary" icon={<UserAddOutlined />}>
                Ajouter Employé
              </Button>
            }
          >
            <Table
              columns={employeeColumns}
              dataSource={employees}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true
              }}
            />
          </Card>
        </Col>

        {/* Budget Overview */}
        <Col xs={24} lg={8}>
          <Card 
            title="Aperçu Budget" 
            extra={
              <Button 
                type="primary" 
                size="small" 
                icon={<PlusOutlined />}
                onClick={() => setModalVisible(true)}
              >
                Ajouter Budget
              </Button>
            }
          >
            <List
              dataSource={budgetData}
              renderItem={(item) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <Text strong>{item.category}</Text>
                      <Text type="secondary">{item.remaining.toLocaleString()} DHS restant</Text>
                    </div>
                    <Progress 
                      percent={Math.round((item.spent / item.allocated) * 100)} 
                      size="small"
                      status={item.spent > item.allocated * 0.9 ? 'exception' : 'active'}
                    />
                  </div>
                </List.Item>
              )}
            />
          </Card>

          {/* Recent Activities */}
          <Card title="Activités Récentes" style={{ marginTop: '16px' }}>
            <List
              size="small"
              dataSource={[
                { action: 'Nouvelle formation créée', time: 'Il y a 2h', user: 'Ahmed Benali' },
                { action: 'Budget mis à jour', time: 'Il y a 4h', user: 'Fatima Zahra' },
                { action: 'Employé ajouté', time: 'Il y a 6h', user: 'Admin' }
              ]}
              renderItem={(item) => (
                <List.Item>
                  <div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{item.time}</div>
                    <div>{item.action}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>par {item.user}</div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Budget Management Modal */}
      <Modal
        title="Ajouter Budget"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="category"
            label="Catégorie"
            rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
          >
            <Select placeholder="Sélectionner une catégorie">
              <Option value="technical">Formations Techniques</Option>
              <Option value="management">Formations Management</Option>
              <Option value="soft_skills">Formations Soft Skills</Option>
              <Option value="certification">Formations Certification</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Montant (DHS)"
            rules={[{ required: true, message: 'Veuillez saisir le montant' }]}
          >
            <Input type="number" placeholder="Ex: 100000" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Ajouter
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                Annuler
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DashboardRRH
