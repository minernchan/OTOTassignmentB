// import MessageController from '../controllers/messageController.js';
const MessageController = require('../controllers/messageController.js')
// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to messagebox'
    });
});

// Import message controller
// var messageController = require('../controllers/messageController');

// Message routes
router.route('/messages')
    .get(MessageController.getAllMessages)
    .post(MessageController.addNewMessage);
router.route('/messages/:message_id')
    .get(MessageController.viewMessage)
    .patch(MessageController.updateMessage)
    .put(MessageController.updateMessage)
    .delete(MessageController.deleteMessage);

// Message routes
// router.route('/messages')
//     .get(messageController.index)
//     .post(messageController.new);
// router.route('/messages/:message_id')
//     .get(messageController.view)
//     .patch(messageController.update)
//     .put(messageController.update)
//     .delete(messageController.delete);

// Export API routes
module.exports = router;
