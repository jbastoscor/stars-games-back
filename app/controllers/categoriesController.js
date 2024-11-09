const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri =
  'mongodb+srv://jbastoscor:bg1FUdAlrlGdCQMC@stars-games.7vlgp.mongodb.net/?retryWrites=true&w=majority&appName=stars-games';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

exports.register_category = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('categories');

    let category = {
      category_name: body.category_name,
      category_logo: body.category_logo,
      category_image: body.category_image,
    };

    collection.insertOne(category, function (err, res) {
      if (err) throw errorResponse(err);
      sucessResponse(res);
    });

    function sucessResponse(res) {
      response.send(res);
    }

    function errorResponse(err) {
      response.send(err);
    }
  });
};

exports.consult_category = function (request, response) {
  const body = request.body;

  if (body._id) {
    body._id = ObjectId(body._id);
  }

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('categories');

    collection.find(body).toArray(function (err, res) {
      if (err) throw errorResponse(err);
      sucessResponse(res);
    });

    function sucessResponse(res) {
      response.send(res);
    }

    function errorResponse(error) {
      response.send(error);
    }
  });
};

exports.consult_categories = function (request, response) {
  console.log(request);

  client.connect((err) => {
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('categories');

    collection.find({}).toArray(function (err, res) {
      if (err) throw errorResponse(err);
      sucessResponse(res);
    });

    function sucessResponse(res) {
      response.send(res);
    }

    function errorResponse(error) {
      response.send(error);
    }
  });
};

exports.update_category = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('categories');

    collection.updateOne(
      body.category_query,
      { $set: body.category_newValues },
      function (err, res) {
        if (err) throw errorResponse(err);
        sucessResponse(res);
      },
    );

    function sucessResponse(res) {
      response.send(res);
    }

    function errorResponse(error) {
      response.send(error);
    }
  });
};

exports.delete_category = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('categories');

    collection.deleteOne(body, function (err, res) {
      if (err) throw errorResponse(err);
      sucessResponse(res);
    });

    function sucessResponse(resDB) {
      response.send(resDB);
    }

    function errorResponse(error) {
      response.send(error);
    }
  });
};
