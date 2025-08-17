const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err)

  // Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    })
  }

  // Sequelize unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Données en conflit',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    })
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur interne du serveur'
  })
}

module.exports = errorMiddleware
