import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../services/authService.js'

const AuthContext = createContext()

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null,
  roles: [],
  permissions: []
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        roles: action.payload.roles || [],
        permissions: action.payload.permissions || []
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        roles: [],
        permissions: [],
        loading: false,
        error: null
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Check if user is authenticated on app load
    if (state.token && !state.user) {
      checkAuthStatus()
    }
  }, [])

  const checkAuthStatus = async () => {
    try {
      dispatch({ type: 'LOGIN_START' })
      const response = await authService.getCurrentUser()
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: state.token,
          roles: response.data.roles || [],
          permissions: response.data.permissions || []
        }
      })
    } catch (error) {
      dispatch({ type: 'LOGOUT' })
      localStorage.removeItem('token')
    }
  }

  const login = async (credentials) => {
    try {
      dispatch({ type: 'LOGIN_START' })
      const response = await authService.login(credentials)
      const { user, token, roles, permissions } = response.data
      
      localStorage.setItem('token', token)
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token, roles, permissions }
      })
      
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage })
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      dispatch({ type: 'LOGOUT' })
    }
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
  }

  const hasRole = (role) => {
    return state.roles.includes(role)
  }

  const hasPermission = (permission) => {
    return state.permissions.includes(permission)
  }

  const value = {
    ...state,
    login,
    logout,
    clearError,
    updateUser,
    hasRole,
    hasPermission
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
