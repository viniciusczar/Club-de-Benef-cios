const Sequelize = require ('sequelize')
const dbConfig = require ('../config/database');

const User = require('../models/User');
const Businesses = require ('../models/Businesses');
//const Categories = require ('../models/Categories');
const Owners = require ('../models/Owners');
const Associate = require ('../models/Associates');
const Authorizations = require ('../models/Authorizations');
const Adverts = require ('../models/Adverts');
const Photoadverts = require ('../models/Photoadverts');
const Contacts = require ('../models/Contacts');
const Favorites = require ('../models/Favorites');
//const Feedbacks = require ('../models/Feedbacks');
const connection = new Sequelize (dbConfig);

//default
User.init(connection);
Businesses.init(connection);
Owners.init(connection);
//Categories.init(connection);
Associate.init(connection);
Authorizations.init(connection);
Contacts.init(connection);
Favorites.init(connection);
//Feedbacks.init(connection);
Adverts.init(connection);
Photoadverts.init(connection);


//Ligação de chaves estrangeiras
//Notification.associate(connection.models);
//User.associate(connection.models);
Businesses.associate(connection.models);
Owners.associate(connection.models);
//Categories.associate(connection.models);
Associate.associate(connection.models);
Authorizations.associate(connection.models);
Contacts.associate(connection.models);
//Feedbacks.associate(connection.models);
Adverts.associate(connection.models);
Photoadverts.associate(connection.models);
Favorites.associate(connection.models);

module.exports = connection;