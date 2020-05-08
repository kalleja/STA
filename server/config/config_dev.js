const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

module.exports = {  
    MONGO_URI: "mongodb+srv://dbUser:3S7Dzg4rpVUFUMqe@cluster0-mmdib.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "jwt-react-redux-websockets-passport",
    JWT_TOKEN_EXPIRATION: 3600,
    SESSION_SECRET: "session-react-redux-websockets-passport",
    SESSION_EXPIRATION: 30 * 24 * 60 * 60 * 1000,
    PORT: 4000
};

