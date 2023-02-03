function parseMessages(req) {
    let messages = {
        warningMessage: req.session.warningMessage,
        successfulMessage: req.session.successfulMessage
    }
    req.session.warningMessage = ''
    req.session.successfulMessage = ''
    return messages
}

module.exports = {parseMessages}