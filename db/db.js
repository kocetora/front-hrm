'use strict';

const Sequelize = require('sequelize');
// const sequelize = new Sequelize('d1gculb3nsnnh0', 'nhwwgfzgrpfwbr', 
// '931280f03ad840a567c239ff56aa26a43b71f56d0af255befa6046d8df53c5d6', {
//   host: 'ec2-46-137-84-140.eu-west-1.compute.amazonaws.com',
//   dialect: 'postgres',
//   port: '5432',
// });
const sequelize = new Sequelize('postgres://nhwwgfzgrpfwbr:931280f03ad840a567c239ff56aa26a43b71f56d0af255befa6046d8df53c5d6@ec2-46-137-84-140.eu-west-1.compute.amazonaws.com:5432/d1gculb3nsnnh0') 

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
