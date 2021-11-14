const stats = require('../models/stats');

const recordStats = (req, res, next) => {
  // check if endpoint exists in config file
  // TODO: put all const endpoints in config file

  stats.getStat(req.method, req.path)
       .then(stats.incrementCount)
       .then(result => next());
}

module.exports = recordStats;
