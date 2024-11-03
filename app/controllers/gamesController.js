const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri =
  'mongodb+srv://jbastoscor:bg1FUdAlrlGdCQMC@stars-games.7vlgp.mongodb.net/?retryWrites=true&w=majority&appName=stars-games';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

exports.search_game = function (request, response) {
  const search = new RegExp(`^${request.body.game_name}`);
  const body = {
    game_name: search,
  };

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client.db('stars-game-database').collection('games');

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

exports.consult_games = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client.db('stars-game-database').collection('games');

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

exports.consult_game = function (request, response) {
  const body = request.body;

  if (body._id) {
    body._id = ObjectId(body._id);
  }

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client.db('stars-game-database').collection('games');

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

exports.register_game = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client.db('stars-game-database').collection('games');

    let game = {
      game_name: body.game_name,
      game_category: body.game_category,
      game_url: body.game_url,
      game_video_url: body.game_video_url,
      game_image_url: body.game_image_url,
      game_description: body.game_description,
    };

    collection.insertOne(game, function (err, res) {
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

exports.update_game = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client.db('stars-game-database').collection('games');

    collection.updateOne(
      body.game_query,
      { $set: body.game_newValues },
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

exports.delete_game = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client.db('stars-game-database').collection('games');

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
