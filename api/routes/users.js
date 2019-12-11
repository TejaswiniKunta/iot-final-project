
var express = require("express");
var app = express();
var router = express.Router();
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const FS = require("fs");
// const Multer = require('multer');
// const Upload = Multer({limits: {fileSize: 2000000 },dest:'./uploads/'})
const CONNECTION_URL = "mongodb+srv://teju:fGwJ2BVcdTHloZny@iot-fhy5l.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "knock";
// var app = Express();
// app.use(BodyParser.json());
// app.use(BodyParser.urlencoded({ extended: true }));
var database, collection, new_collection;

app.listen(8000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, {useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("response");
        // new_collection = database.collection("response")
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
    // collection.watch().on('change', data => console.log(new Date(), data));
router.get("/:userId",function(req,res,next) {
console.log( req.params.userId);
  door = {$set:{
    '_id':1,
     'open': req.params.userId
  }}
  // door = {
  //   '_id':1,
  //    'open': 0
  // }
  // collection.insert(door, (error, result) => {
  //           if(error) {
  //               return res.status(500).send(error);
  //           }
  //           res.send(result);
  //       });

  collection.update({'_id':1},door, (error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });

    // res.send("API is working properly");
});
});



module.exports = router;
