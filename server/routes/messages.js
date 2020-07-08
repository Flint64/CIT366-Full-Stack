var express = require("express");
var router = express.Router();
var sequenceGenerator = require("./sequenceGenerator");

const Message = require('../models/message');

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occured',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Message.find()
    .then(messages => {
        res.status(200).json({
            message: "Messages created successfully",
            messages: messages
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });

message.save()
    .then(createdMessage => {
        res.status(201).json({
            message: "Message added successfully",
            message: createdMessage
        });
    })
    .catch(error => {
        returnError(res, error);
    })
});

module.exports = router;