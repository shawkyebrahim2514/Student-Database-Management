function validateLogin(adminID, password) {
    if (adminID.length > 255 || password.length > 255) {
        return 'There is an error in your data!';
    } else {
        return '';
    }
}

function validateRangeOfIDs(startID, endID) {
    if (isNaN(startID) || isNaN(endID) || startID.length !== 8 || endID.length !== 8 || endID < startID) {
        return 0;
    } else {
        return 1;
    }
}

function validateRangeOfGPAs(startGPA, endGPA) {
    if (isNaN(startGPA) || isNaN(endGPA) || !/^[0-4](\.\d{1,2})?$/.test(startGPA) ||
        !/^[0-4](\.\d{1,2})?$/.test(endGPA) || endGPA < startGPA) {
        return 0;
    } else {
        return 1;
    }
}

function validateShowByLevel(level) {
    if (isNaN(level) || level < 1 || level > 4) {
        return 0;
    } else {
        return 1;
    }
}

function checkAdmin(req) {
    return req.session.user && req.session.user.userType === 'admin';
}

module.exports = {
    validateRangeOfIDs,
    checkAdmin,
    validateRangeOfGPAs,
    validateLogin,
    validateShowByLevel
}