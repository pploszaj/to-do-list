const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://pploszaj:Mamamia7$@cluster0.xipyk4w.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'to-do_app'
})
.then(() => {
    console.log('connected to mongoDB');
})
.catch((err) => {
    console.log(err);
});


const todoSchema = mongoose.Schema({
    name: {
      type: String,
    },
    todos: [String]
  });

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    lists: {type: [todoSchema], default: []}
});

module.exports = mongoose.model('User', userSchema);