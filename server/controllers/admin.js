const stats = require('../models/stats');

exports.getStats = (req, res, next) => {
  const respond = (result) => {
    res.json({stats: result});
  }

  stats.getAllStats()
       .then(respond)
       .catch(next)
}
