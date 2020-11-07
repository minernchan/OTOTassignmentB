// messageModel.js
var mongoose = require('mongoose');
// Setup schema
var messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    sendee: String,
    sendee_email: String,
    content: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Message model
var Message = module.exports = mongoose.model('message', messageSchema);
module.exports.get = function (callback, limit) {
    Message.find(callback).limit(limit);
}