const verifyUser = (username, password) => {
    if (username == 'rasoul') {
        if (password == '144') return true;
    }
    return false;
}

module.exports = {
    verifyUser
};
