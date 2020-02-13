const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dionart:camisetas123@cluster0-veaas.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

mongoose.Promise = global.Promise;

module.exports = mongoose;

