
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema ({
    price: Number,
    title: String,
    address: String,
    city: String,
    state: String,
    zip: Number,
    country: String,
    desc: String,
    secureUrls: [String],
    files: [String],
    status: String,
    category: {
        type: String,
        enum: ['residential', 'commercial', 'apartment', 'single family home',
                'villa', 'studio', 'condo', 'office', 'shop' ]
    },
    size: Number,
    bedroom: Number,
    bathroom: Number,
    furniture: Boolean,
    power: Boolean,
    water: Boolean,
    security: Boolean
}, {
    timestamps: true,
})

module.exports = mongoose.model('Property', PropertySchema);

