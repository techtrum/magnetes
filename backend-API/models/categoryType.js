const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryTypeSchema = new Schema ({
    category: String,
    properties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
})

module.exports = mongoose.model('CategoryType', CategoryTypeSchema);