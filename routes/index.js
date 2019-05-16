var express = require('express');
var { MongoClient } = require('mongodb');
var router = express.Router();

const title = process.env.TITLE;

/* GET home page. */
router.get('/', function(req, res, next) {
  const url = "mongodb://library-database.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";   
  const password = "HUCxiIpMn6DskFJ9jGduaGROT9WZTyASBrJhkzAkeXVnTMA9b8s22kBtAZHi4hVoTWgod5LrtgQX4BqwZ7522w==";
  const user = "library-database";
  const dbName = 'library';   


  (async function mongo(){
      let client;
      try {
          client = await MongoClient.connect(url, { 
              auth: {
                  user,
                  password
              }
          }
      );
          const db = client.db(dbName);
          const response = await db.collection('books').find().toArray();
          res.json(response);
      } catch(err){
          console.log(err);
      }
  }())
});

module.exports = router;
