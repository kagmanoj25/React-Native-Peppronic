const env = process.env.NODE_ENV || 'development'

const apiEnvironment = {
    development: {
        api: 'https://newsapi.org/v2',
        key: '22a1f0ba6fae4c339754b3d4d530c2d4',
        country: 'us'
    }
}

module.exports = apiEnvironment[env]