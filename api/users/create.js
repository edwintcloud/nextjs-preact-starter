const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  if (
    (!req.query || !req.query.username || !req.query.password) &&
    (!req.body || !req.body.username || !req.body.password)
  ) {
    return res.json({
      status: 400,
      result:
        '{username} and {password} must be specified in query parameters or request body of request.',
    });
  }

  try {
    // connect to mongoDB
    const client = await new MongoClient(process.env.MONGODB_URL).connect();
    const DB = client.db(process.env.MONGODB_DB_NAME);

    // insert record into database
    const dbResult = await DB.collection('users').insertOne(
      req.body || req.query,
    );

    // return created record
    return res.json({
      status: 200,
      result: dbResult.ops[0],
    });
  } catch (error) {
    // return error
    return res.json({
      status: 500,
      result: error.message,
    });
  }
};
