const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri =
  'mongodb+srv://jbastoscor:bg1FUdAlrlGdCQMC@stars-games.7vlgp.mongodb.net/?retryWrites=true&w=majority&appName=stars-games';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

exports.register_game_review = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('game_reviews');

    let gameReviews = {
      game_name: body.game_name,
      game_reviews: body.game_reviews,
    };

    collection.insertOne(gameReviews, function (err, res) {
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

exports.consult_game_reviews = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('game_reviews');

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

exports.update_game_reviews = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('game_reviews');

    collection.updateOne(
      body.game_query,
      { $set: body.game_reviews_updated },
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

exports.register_user_review = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('user_reviews');

    let userReviews = {
      user_username: body.user_username,
      user_reviews: body.user_reviews,
    };

    collection.insertOne(userReviews, function (err, res) {
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

exports.consult_user_reviews = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('user_reviews');

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

exports.update_user_reviews = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('user_reviews');

    collection.updateOne(
      body.user_query,
      { $set: body.user_reviews_updated },
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
