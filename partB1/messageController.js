// messageController.js
// Import message model
Message = require('./messageModel');
// Handle index actions
exports.index = function (req, res) {
    Message.get(function (err, messages) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Messages retrieved successfully",
            data: messages
        });
    });
};
// Handle create message actions
exports.new = function (req, res) {
    var message = new Message();
    message.name = req.body.name ? req.body.name : message.name;
    message.email = req.body.email;
    message.sendee = req.body.sendee;
    message.sendee_email = req.body.sendee_email;
    message.content = req.body.content;
// save the message and check for errors
    message.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New message created!',
            data: message
        });
    });
};
// Handle view message info
exports.view = function (req, res) {
    Message.findById(req.params.message_id, function (err, message) {
        if (err)
            res.send(err);
        res.json({
            message: 'Message details loading..',
            data: message
        });
    });
};
// Handle update message info
exports.update = function (req, res) {
    Message.findById(req.params.message_id, function (err, message) {
        if (err)
            res.send(err);

        message.name = req.body.name ? req.body.name : message.name;
        message.email = req.body.email;
        message.sendee = req.body.sendee;
        message.sendee_email = req.body.sendee_email;
        message.content = req.body.content;

        // save the message and check for errors
        message.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Message Info updated',
                data: message
            });
        });
    });
};

// Handle delete message
exports.delete = function (req, res) {
    Message.remove({
        _id: req.params.message_id
    }, function (err, message) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Message deleted'
        });
    });
};