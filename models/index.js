const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('employeedatabase', 'root', 'Dharani@1229', {
  host: 'localhost',
  logging:true, // if give false not work any db funtionalities
  dialect:'mysql'
});

try {
   sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


module.exports = sequelize;