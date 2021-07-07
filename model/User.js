const { Schema, model } = require('mongoose');

const schema = new Schema({

    email: { type: String, required: true },
    hashPassword: { type: String, required: true },
    gender: { type: String, required: true },
    historyTrips: [{ type: Schema.Types.ObjectId, ref: 'Trip' }]
})

module.exports = model('User', schema);