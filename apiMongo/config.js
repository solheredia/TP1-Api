const mongoose = require ('mongoose');

const dbconnect = () => {


    mongoose.connect("mongodb://127.0.0.1:27017/books_prueba")
      .then(() => {
        console.log('Conectado a MongoDB');
      })
      .catch((err) => {
        console.log(err);
      });
    }
module.exports = dbconnect;