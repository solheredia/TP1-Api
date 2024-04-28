const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema(
    {
    book:{
        type: String
    },
    author: {
        type: String
    },
    year: {
        type: Number
    }

},
{
    timestamps:true,
    versionkey:false,
}

);

const modelBook = mongoose.model("book", bookSchema);
module.exports = modelBook;
