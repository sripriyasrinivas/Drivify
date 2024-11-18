const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb://localhost:27017/Drivify";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDb() {
  try {
    await client.connect();
    client.db("test").command({ ping: 1 });
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}

let db = client.db("driver");

// Exporting the db connection object
module.exports = db;  // Export the db object

// Or if you prefer to export the connectDb function:
module.exports.connectDb = connectDb;


// const Db = "mongodb://localhost:27017/Drivify";
// const client = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
 
// var _db;
 
// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db)
//       {
//         _db = db.db("Drivifys");
//         console.log("Successfully connected to MongoDB."); 
//       }
//       return callback(err);
//          });
//   },
 
//   getDb: function () {
//     return _db;
//   },
// };

