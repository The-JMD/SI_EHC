import React from 'react'
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Typography, 
  Space, 
  Statistic,
  List,
  Avatar,
  Tag
} from 'antd'
import { 
  BookOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  StarOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  UserOutlined,
  CalendarOutlined
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const HomePage = () => {
  const features = [
    {
      icon: <BookOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: 'Catalogue de Formations',
      description: 'Accédez à un large éventail de formations techniques, management et soft skills'
    },
    {
      icon: <TeamOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
      title: 'Gestion des Participants',
      description: 'Gérez facilement les inscriptions et le suivi des participants'
    },
    {
      icon: <TrophyOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
      title: 'Certifications',
      description: 'Obtenez des certifications reconnues pour vos compétences'
    },
    {
      icon: <StarOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
      title: 'Évaluations',
      description: 'Système d\'évaluation complet pour mesurer les progrès'
    }
  ]

  const stats = [
    { title: 'Formations Disponibles', value: 150, suffix: '+' },
    { title: 'Participants Formés', value: 2500, suffix: '+' },
    { title: 'Formateurs Experts', value: 45, suffix: '+' },
    { title: 'Taux de Satisfaction', value: 98, suffix: '%' }
  ]

  const testimonials = [
    {
      name: 'Ahmed Benali',
      position: 'Développeur Senior',
      company: 'EHC Group',
      content: 'La plateforme EHC Training Hub a transformé notre approche de la formation. Interface intuitive et contenu de qualité.',
      rating: 5
    },
    {
      name: 'Fatima Zahra',
      position: 'Responsable RH',
      company: 'EHC Group',
      content: 'Excellent outil de gestion des formations. Le suivi des participants et les rapports sont très utiles.',
      rating: 5
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={1} style={{ color: 'white', marginBottom: '24px' }}>
            EHC Training Hub
          </Title>
          <Paragraph style={{ 
            fontSize: '20px', 
            color: 'white', 
            marginBottom: '40px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Plateforme de gestion de formation intégrée pour optimiser le développement des compétences de votre équipe
          </Paragraph>
          <Space size="large">
            <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
              Commencer Maintenant
            </Button>
            <Button size="large" style={{ color: 'white', borderColor: 'white' }}>
              Voir la Démo
            </Button>
          </Space>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card style={{ textAlign: 'center' }}>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{ color: '#1890ff', fontSize: '32px' }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '60px' }}>
            Fonctionnalités Principales
          </Title>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card style={{ textAlign: 'center', height: '100%' }}>
                  <div style={{ marginBottom: '16px' }}>
                    {feature.icon}
                  </div>
                  <Title level={4} style={{ marginBottom: '12px' }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: '#666' }}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={2} style={{ marginBottom: '32px' }}>
                Pourquoi Choisir EHC Training Hub ?
              </Title>
              <List
                dataSource={[
                  'Interface intuitive et moderne',
                  'Gestion complète des formations',
                  'Suivi en temps réel des progrès',
                  'Rapports détaillés et analytics',
                  'Support multilingue',
                  'Sécurité des données garantie'
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Space>
                      <CheckCircleOutlined style={{ color: '#52c41a' }} />
                      <Text>{item}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Col>
            <Col xs={24} lg={12}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <UserOutlined style={{ fontSize: '64px', color: '#1890ff', marginBottom: '24px' }} />
                  <Title level={3}>Gestion des Rôles</Title>
                  <Paragraph>
                    Système de rôles avancé pour une gestion granulaire des permissions :
                  </Paragraph>
                  <Space wrap style={{ marginTop: '16px' }}>
                    <Tag color="red">Administrateur</Tag>
                    <Tag color="blue">RH</Tag>
                    <Tag color="green">Responsable Formation</Tag>
                    <Tag color="orange">Manager</Tag>
                    <Tag color="default">Employé</Tag>
                    <Tag color="purple">Formateur</Tag>
                  </Space>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '60px' }}>
            Témoignages Clients
          </Title>
          <Row gutter={[32, 32]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} lg={12} key={index}>
                <Card>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <Avatar size={64} style={{ backgroundColor: '#1890ff' }}>
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: '8px' }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarOutlined key={i} style={{ color: '#faad14' }} />
                        ))}
                      </div>
                      <Paragraph style={{ fontStyle: 'italic', marginBottom: '16px' }}>
                        "{testimonial.content}"
                      </Paragraph>
                      <div>
                        <Text strong>{testimonial.name}</Text>
                        <br />
                        <Text type="secondary">{testimonial.position} - {testimonial.company}</Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
        padding: '60px 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={2} style={{ color: 'white', marginBottom: '24px' }}>
            Prêt à Transformer Votre Formation ?
          </Title>
          <Paragraph style={{ 
            fontSize: '18px', 
            color: 'white', 
            marginBottom: '40px'
          }}>
            Rejoignez des centaines d'entreprises qui font confiance à EHC Training Hub
          </Paragraph>
          <Space size="large">
            <Button type="primary" size="large" style={{ background: 'white', color: '#1890ff' }}>
              Demander une Démo
            </Button>
            <Button size="large" style={{ color: 'white', borderColor: 'white' }}>
              Contacter l'Équipe
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default HomePage
