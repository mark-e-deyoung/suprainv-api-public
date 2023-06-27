const { faker } = require('@faker-js/faker');
const { QueryTypes, Sequelize} =require('sequelize');
const models = require('../models');

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

'use strict';

const NUM_TEST_USERS = 50;

const createTestUser = () =>{
  return{
      username: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals], length:2,seperator:'-'}),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      password: faker.word.adjective(),
  };
}

const createTestUsers = (numTestUsers = NUM_TEST_USERS) => {
  return Array.from({length: numTestUsers}, createTestUser);
}

const NUM_TEST_ITEMS = 100;

// return a 'random' integer between (min, max)
function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

function createTestItem(uuid, count) {
  return{
    item_name: faker.commerce.productName(),
    item_description: faker.commerce.productDescription(),
    user_id: uuid,
    quantity: count,
  };
}

const createTestItems = (uuid, numTestItems = NUM_TEST_ITEMS) => {
  var items = [];
  for(var i=0;i<=numTestItems; i++){
    items.push(createTestItem(uuid,between(0,1000)));
  }
  return Array.from(items);
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // might need to create a set of unique usernames.
    // Otherwise might get duplicates which don't insert due to unique constraint.
    await queryInterface.bulkInsert('Users',createTestUsers(),{});

    // might need to add DB_PORT on deployment
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'postgres',
      }
    );

    (async () => {
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    })();

    // Model approach
    var results = await models.Users.findAll({attributes:['user_id']})
    // map the data values
    const users = results.map(result => result.dataValues)

    // debugging
 /*   users.forEach(
      (user) => {
        console.log(user.user_id)
      }
    )
*/
    for(let user of users){
      var testItems = createTestItems(user.user_id,between(0,NUM_TEST_ITEMS))
      if( testItems.length > 0 ){
        await queryInterface.bulkInsert('Items',testItems,{});
      }
      
    }

    // Insert 5 users w/o any items
    await queryInterface.bulkInsert('Users',createTestUsers(5),{});

  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    
  }
};
