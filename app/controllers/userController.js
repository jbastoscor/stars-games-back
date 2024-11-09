const axios = require('axios');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri =
  'mongodb+srv://jbastoscor:bg1FUdAlrlGdCQMC@stars-games.7vlgp.mongodb.net/?retryWrites=true&w=majority&appName=stars-games';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

exports.register_user = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client.db('stars-game-database').collection('users');

    let user = {
      user_full_name: body.user_full_name,
      user_username: body.user_username,
      user_password: body.user_password,
      user_birthday: body.user_birthday,
      user_country: body.user_country,
      user_state: body.user_state,
    };

    collection.insertOne(user, function (err, res) {
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

exports.consult_user = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client.db('stars-game-database').collection('users');

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

exports.update_user = function (request, response) {
  const body = request.body;

  console.log(request);
  console.log(body);

  client.connect((err) => {
    if (err) throw err;

    const collection = client.db('stars-game-database').collection('users');

    collection.updateOne(
      body.user_query,
      { $set: body.user_newValues },
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

exports.signin_user = function (request, response) {
  const body = request.body;
  let axiosUrl =
    request.headers.host === 'localhost:8080'
      ? 'http://localhost:8080/user/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/user/consult';

  let query = {
    user_username: body.user_username,
  };

  axios
    .post(axiosUrl, query)
    .then((res) => {
      if (res.status == 200 && res.statusText === 'OK') {
        if (res.data.length === 1) {
          if (
            res.data[0].user_username === body.user_username &&
            res.data[0].user_password === body.user_password
          ) {
            let frontResponse = {
              login_authorized: true,
              login_username: res.data[0].user_username,
              login_fullName: res.data[0].user_full_name,
            };
            response.send(frontResponse);
          } else {
            let frontResponse = {
              login_authorized: false,
              login_error: 'Dados inválidos, tente novamente!',
            };
            response.send(frontResponse);
          }
        } else {
          let frontResponse = {
            login_authorized: false,
            login_error: 'Dados inválidos, tente novamente!',
          };
          response.send(frontResponse);
        }
      } else {
        let frontResponse = {
          login_authorized: false,
          login_error: 'Erro inesperado, tente novamente!',
        };
        response.send(frontResponse);
      }
    })
    .catch(function (error) {
      console.log(error);
      response.send(error);
    });
};

exports.signup_user = function (request, response) {
  const body = request.body;
  let axiosUserConsultUrl =
    request.headers.host === 'localhost:8080'
      ? 'http://localhost:8080/user/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/user/consult';
  let axiosUserRegistertUrl =
    request.headers.host === 'localhost:8080'
      ? 'http://localhost:8080/user/register'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/user/register';

  let queryConsult = {
    user_username: body.user_username,
  };

  axios
    .post(axiosUserConsultUrl, queryConsult)
    .then((res) => {
      if (res.status == 200 && res.statusText === 'OK') {
        if (res.data.length === 1) {
          let frontResponse = {
            signup_success: false,
            signup_error: 'Username existente, por favor escolha outro.',
          };
          response.send(frontResponse);
        } else {
          axios
            .post(axiosUserRegistertUrl, body)
            .then((res) => {
              if (res.status == 200 && res.statusText === 'OK') {
                if (res.data.acknowledged) {
                  let frontResponse = {
                    signup_success: true,
                    signup_message: 'Cadastro realizado com sucesso!',
                  };
                  response.send(frontResponse);
                } else {
                  let frontResponse = {
                    signup_success: false,
                    signup_error: 'Erro inesperado, tente novamente!',
                  };
                  response.send(frontResponse);
                }
              } else {
                let frontResponse = {
                  login_authorized: false,
                  login_error: 'Erro inesperado, tente novamente!',
                };
                response.send(frontResponse);
              }
            })
            .catch(function (error) {
              console.log(error);
              response.send(error);
            });
        }
      } else {
        let frontResponse = {
          login_authorized: false,
          login_error: 'Erro inesperado, tente novamente!',
        };
        response.send(frontResponse);
      }
    })
    .catch(function (error) {
      console.log(error);
      response.send(error);
    });
};

exports.valid_update_user_data = function (request, response) {
  const body = request.body;
  let axiosUserUpdateUrl =
    request.headers.host === 'localhost:8080'
      ? 'http://localhost:8080/user/update'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/user/update';

  let bodyUpdate = {
    user_query: { user_username: body.user_username },
    user_newValues: {
      user_full_name: body.user_full_name,
      user_username: body.user_username,
      user_password: body.user_password,
      user_birthday: body.user_birthday,
      user_country: body.user_country,
      user_state: body.user_state,
    },
  };

  axios
    .post(axiosUserUpdateUrl, bodyUpdate)
    .then((res) => {
      if (res.status == 200 && res.statusText === 'OK') {
        if (res.data.acknowledged) {
          let frontResponse = {
            update_success: true,
            update_message: 'Dados atualizados com sucesso!',
          };
          response.send(frontResponse);
        } else {
          let frontResponse = {
            update_success: false,
            update_message: 'Erro inesperado, tente novamente!',
          };
          response.send(frontResponse);
        }
      } else {
        let frontResponse = {
          update_success: false,
          update_message: 'Erro inesperado, tente novamente!',
        };
        response.send(frontResponse);
      }
    })
    .catch(function (error) {
      console.log(error);
      response.send(error);
    });
};

exports.valid_update_user_password = function (request, response) {
  const body = request.body;
  let axiosUserUpdateUrl =
    request.headers.host === 'localhost:8080'
      ? 'http://localhost:8080/user/update'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/user/update';

  let bodyUpdate = {
    user_query: { user_username: body.user_username },
    user_newValues: {
      user_password: body.user_password,
    },
  };

  axios
    .post(axiosUserUpdateUrl, bodyUpdate)
    .then((res) => {
      if (res.status == 200 && res.statusText === 'OK') {
        if (res.data.acknowledged) {
          let frontResponse = {
            update_success: true,
            update_message: 'Senha atualizada com sucesso!',
          };
          response.send(frontResponse);
        } else {
          let frontResponse = {
            update_success: false,
            update_message: 'Erro inesperado, tente novamente!',
          };
          response.send(frontResponse);
        }
      } else {
        let frontResponse = {
          update_success: false,
          update_message: 'Erro inesperado, tente novamente!',
        };
        response.send(frontResponse);
      }
    })
    .catch(function (error) {
      console.log(error);
      response.send(error);
    });
};
