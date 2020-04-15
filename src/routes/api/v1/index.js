const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.status(200).json({
      status: 'success',
      message: 'Hello from teamwork!!',
    });
  });

  return router;
}
