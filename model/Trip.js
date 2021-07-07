const { Schema, model } = require('mongoose');

const schema = new Schema({
    owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    start: { type: String, required: true, minLength: [4, 'Starting Point should be at least 4 characters long!'] },
    end: { type: String, required: true, minLength: [4, 'End Point should be at least 4 characters long!'] },
    date: { type: String, required: true },
    time: { type: String, required: true },
    imageUrl: { type: String, required: true, match: [/^https?:\/\//, 'Image link must start with http(s)://'] },
    carBrand: { type: String, required: true, minLength: [4, 'Car Brand should be at least 4 characters long!'] },
    numSeats: { type: Number, required: true, min: [0, 'Canot be a negative number!'], max: [3, 'Seats limit exceed, Max 3!'] },
    price: { type: Number, required: true, min: [1, '1 BGN is minimum price'], max: [50, 'Maximum price is 50 BGN'] },
    descriptiont: { type: String, required: true, min: [10, 'The Description should be minimum 10 characters long.'] },
    buddis: [{ type: Schema.Types.ObjectId, ref: 'User' }]

})

module.exports = model('Trip', schema);