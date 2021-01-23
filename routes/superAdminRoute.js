const express = require('express');
const router = express.Router();
const {
  getAccessLogs,
  getActionLogs,
  getAuditLogs,
  respondToAdminActionLogs,
} = require('../controller/superAdminController');

router.get('/accesslogs', getAccessLogs);

router.get('/actionlogs', getActionLogs);

router.get('/auditlogs', getAuditLogs);

router.post('/actionlogs/id=:id', respondToAdminActionLogs);

module.exports = router;
