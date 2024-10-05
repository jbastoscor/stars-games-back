const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri =
  'mongodb+srv://jbastoscor:bg1FUdAlrlGdCQMC@stars-games.7vlgp.mongodb.net/?retryWrites=true&w=majority&appName=stars-games';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

exports.consult_categories = function (request, response) {
  // console.log(request);

  client.connect((err) => {
    console.log('123');
    if (err) throw err;

    const collection = client
      .db('stars-game-database')
      .collection('categories');

    collection.find({}).toArray(function (err, res) {
      console.log('1');
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
