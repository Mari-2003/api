const mongoose = require('mongoose')

mongoose.connect("mongodb://0.0.0.0:27017/Perfx",{
    useNewUrlParser:true,
    useUnifiedTopology:true,  
})

const con = mongoose.connection;

con.once('open', () => console.log('Connected to MongoDB'));
con.on('error', (err) => console.error('MongoDB connection error:', err));

module.exports = con;