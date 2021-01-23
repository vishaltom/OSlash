const AccessLog = require('../models/AccessLog');
const ActionLog = require('../models/ActionLog');
const AuditLog = require('../models/AuditLog');

exports.getAccessLogs = (req, res) => {
  AccessLog.find({}, (err, logs) => {
    if (!logs) {
      return res
        .status(500)
        .json({ status: false, message: 'Error while fetching access logs' });
    }
    return res.status(200).json({
      status: true,
      message: 'Access logs successfully retrieved',
      logs: logs,
    });
  });
};
exports.getActionLogs = (req, res) => {
  ActionLog.find({}, (err, logs) => {
    if (!logs) {
      return res
        .status(500)
        .json({ status: false, message: 'Error while fetching action logs' });
    }
    return res.status(200).json({
      status: true,
      message: 'Action logs successfully retrieved',
      logs: logs,
    });
  });
};
exports.getAuditLogs = (req, res) => {
  AuditLog.find({}, (err, logs) => {
    if (!logs) {
      return res
        .status(500)
        .json({ status: false, message: 'Error while fetching audit logs' });
    }
    return res.status(200).json({
      status: true,
      message: 'Audit logs successfully retrieved',
      logs: logs,
    });
  });
};
exports.respondToAdminActionLogs = (req, res) => {
  const id = req.params.id;
  const status = req.query.status;
  const auditLog = new AuditLog({
    action: id,
    status: status,
    actionBy: 'SuperAdmin',
  });
  auditLog.save((err, log) => {
    if (!log) {
      return res
        .status(500)
        .json({ status: false, message: 'Error while updating status' });
    }
    return res.status(200).json({
      status: true,
      message: 'Action status successfully updated',
    });
  });
};
