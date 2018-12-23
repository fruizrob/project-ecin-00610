const Sequelize = require('sequelize');
const PassportLocalSequelize = require('passport-local-sequelize');
const config = require('../config.json');

// Setup sequelize db connection
const db = new Sequelize(config.dbUri, { logging: false });

// Define the User model.
const User = db.define(
  'user',
  {
    rutpasaporte: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    nompersona: Sequelize.STRING,
    password_hash: Sequelize.STRING,
    password_salt: Sequelize.STRING,
    user_type_id: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

// Atach passport to user model.
PassportLocalSequelize.attachToUser(User, {
  usernameField: 'rutpasaporte',
  hashField: 'password_hash',
  saltField: 'password_salt'
});

User.update = (id, password, cb) => {
  User.findByUsername(id, (err, user) => {
    if (err)
      return cb(err);

    if (!user)
      return cb(new Error('El usuario no existe.'));

    user.setPassword(password, (err, user) => {
      if (err)
        return cb(err);

      user.setActivationKey((err, user) => {
        if (err)
          return cb(err);

        user['rutpasaporte'] = id;

        user.save()
          .then(() => {
            cb(null, user);
          })
          .catch((err) => {
            cb(err)
          });
      });
    });
  });
};

module.exports = User;