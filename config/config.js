const config = {
    development: {
        PORT: 3000,
    },
}

module.exports = config[process.env.NODE_ENV.trim()]