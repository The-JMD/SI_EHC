import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../redux/slices/authSlice.js'
import { selectAuthLoading, selectAuthError } from '../../redux/slices/authSlice.js'

const Login = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)

  const onFinish = async (values) => {
    try {
      const result = await dispatch(login(values)).unwrap()
      message.success('Connexion réussie!')
      navigate('/dashboard/employee')
    } catch (err) {
      message.error(err || 'Erreur de connexion')
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
        Connexion
      </h2>
      
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Veuillez saisir votre email!' },
            { type: 'email', message: 'Email invalide!' }
          ]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="votre@email.com"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mot de passe"
          rules={[
            { required: true, message: 'Veuillez saisir votre mot de passe!' },
            { min: 6, message: 'Le mot de passe doit contenir au moins 6 caractères!' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Mot de passe"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Se souvenir de moi</Checkbox>
          </Form.Item>

          <Link 
            to="/auth/forgot-password"
            style={{ float: 'right' }}
          >
            Mot de passe oublié?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            size="large"
            style={{ width: '100%' }}
          >
            Se connecter
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#666' }}>Pas encore de compte? </span>
          <Link to="/auth/register">S'inscrire</Link>
        </div>
      </Form>
    </div>
  )
}

export default Login
