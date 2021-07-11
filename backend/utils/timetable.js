const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

module.exports = {
  finder: function find(name, query, cb) {
    mongoose.connection.db.collection(name, function (err, collection) {
      collection.find(query).toArray(cb);
    });
  },
};
