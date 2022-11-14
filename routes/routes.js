const { Router } = require("express");
const router = Router();
const cntrs = require('../controllers/controlles')

router.post('/transactions', cntrs.getTransactions)

module.exports = router