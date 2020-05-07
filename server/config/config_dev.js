const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

module.exports = {
    MONGO_URI: "mongodb+srv://dbUser:mZQG1lCq2uEniLNN@cluster0-f2fqy.azure.mongodb.net/react-redux-websockets-passport?retryWrites=true&w=majority",
    JWT_SECRET: "jwt-react-redux-websockets-passport",
    JWT_TOKEN_EXPIRATION: 3600,
    SESSION_SECRET: "session-react-redux-websockets-passport",
    SESSION_EXPIRATION: 30 * 24 * 60 * 60 * 1000,
    PORT: 3000
};

