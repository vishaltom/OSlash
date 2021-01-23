const mongoose = require('mongoose');
const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActionLog',
    },
    status: {
      type: String,
    },
    actionBy: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model('AuditLog', auditLogSchema);
