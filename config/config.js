const config = {
    PORT: 5000,
    DB_URL: 'mongodb://localhost/softuni-wiki',
    COOKIE_NAME: 'auth-token',
    SECRET: 'topSecret',
    SALT_ROUNDS: 11
}

module.exports = config;