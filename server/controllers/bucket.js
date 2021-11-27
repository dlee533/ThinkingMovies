const db = require('../modules/db');

exports.getBucket = (req, res, next) => {
  console.log('getBucket');
  const sql = `SELECT bucketlist.name,bucketlist.id,filmItem.id as fid,filmItem.title,filmItem.year,filmItem.image \
               FROM bucketlist \
               LEFT JOIN bucketItem ON bucketlist.id=bucketItem.bucketlist_id \
               LEFT JOIN filmItem ON bucketItem.item_id=filmItem.id \
               WHERE bucketlist.user_id=${req.params.uid}\
               AND bucketlist.id=${req.params.bid}`;

  const respond = (result) => {
    const bucket = {};

    for (const [key, value] of Object.entries(result)) {
      if (Object.keys(bucket).length === 0) {
        bucket.bid = value.id,
        bucket.bucketName = value.name,
        bucket.items = []
      };

      bucket.items.push({
        id: value.fid,
        title: value.title,
        year: value.year,
        image: value.image
      });
    }

      res.status(200)
         .json({ bucket: bucket });
    }

    db.promise(sql)
      .then(respond)
      .catch(next);
}

exports.createBucket = (req, res, next) => {
  console.log(req.params);
  const sql = `INSERT INTO bucketlist (name, user_id) VALUES ("${req.body.bucketName}", "${req.params.uid}")`;

  const respond = (result) => {
    res.status(200).json({
      success: true,
      message: `Bucket ${req.body.bucketName} created`
    })
  }

  db.promise(sql)
    .then(respond)
    .catch(next);
}

exports.getAllBuckets = (req, res, next) => {
  const sql = `SELECT bucketlist.name,bucketlist.id,filmItem.id as fid,filmItem.title,filmItem.year,filmItem.image \
               FROM bucketlist \
               LEFT JOIN bucketItem ON bucketlist.id=bucketItem.bucketlist_id \
               LEFT JOIN filmItem ON bucketItem.item_id=filmItem.id \
               WHERE bucketlist.user_id=${req.params.uid}`;

  const respond = (result) => {
      const buckets = [];
      const bucketObj = {};
      let index = 0;

      for (const [key, value] of Object.entries(result)) {
        if (bucketObj[value.id] === undefined) {
          bucketObj[value.id] = index++;
          buckets.push({
            bid: value.id,
            bucketName: value.name,
            items: []
          })
        }

        buckets[bucketObj[value.id]].items.push({
          title: value.title,
          year: value.year,
          image: value.image,
          id: value.fid
        });
      }
      res.status(200)
         .json({ buckets: buckets });
    }

    db.promise(sql)
      .then(respond)
      .catch(next);
}



exports.deleteBucket = (req, res, next) => {
  const sqlItem = `DELETE FROM bucketItem WHERE bucketlist_id=${req.params.bid};`;
  const sqlList = `DELETE FROM bucketlist WHERE id=${req.params.bid};`;

  const respond = (result) => {
    res.status(200).json({
      success: true,
      message: `bucketlist successfully deleted`
    })
  }

  db.promise(sqlItem)
    .then(db.promise(sqlList))
    .then(respond)
    .catch(next)
}


exports.addItem = (req, res, next) => {
  let sql = `INSERT INTO bucketItem(bucketlist_id, item_id) VALUES(${req.params.bid}, ${req.body.fid})`;
  console.log(sql);
  const respond = () => {
    res.json({
      success: true,
      message: `item successfully added`
    });
  }

  db.promise(sql)
    .then(respond)
    .catch(next);
}

exports.updateBucketName = (req, res, next) => {
  let sql = `UPDATE bucketlist SET name="${req.body.bucketName}" WHERE id=${req.params.bid};`;

  const respond = () => {
    res.json({
      success: true,
      message: `bucketName successfully updated`
    });
  }

  db.promise(sql)
    .then(respond)
    .catch(next);
}

exports.deleteItem = (req, res, next) => {
  const sql = `DELETE FROM bucketItem WHERE bucketlist_id=${req.params.bid} AND item_id=${req.params.iid};`;
  console.log(sql);

  const respond = (result) => {
    res.status(200).json({
      success: true,
      message: `bucketItem successfully deleted`
    });
  }

  db.promise(sql)
    .then(respond)
    .catch(next);
}
