const User = require('./userModel')

const userController = {};

userController.createUser = (req,res, next) => {
    console.log('inside createUser func');
    console.log('body', req.body)
    const {username, password} = res.locals;
    User.create({username, password})
    .then(result => {
        console.log('user created')
        res.send(result)
        next()
    })
    .catch(err => {
        console.log('error inside create user')
        console.log(err)
    })
    
}

userController.loginUser = (req,res,next) => {
    console.log('inside loginUser func');
    const {username, password} = req.body;
    User.findOne({username, password})
    .then(result => {
        if(result) {
            console.log('found the user')
            res.locals.username = username;
            res.locals.password = password;
            res.locals.lists = result.lists;
            console.log(result)
            return next()
        }
        else{
            next({
                log: 'Express error handler caught unknown middleware error',
                status: 400,
                message: {err: 'Did not find user'}
            })
        }
    })
    .catch(err => {
        next(err);
    })
}

userController.verifyUser = async (req,res,next) => {
    console.log('inside verifyUser func');
    console.log('body inside verify', req.body);
    const {username, password} = await req.body;
    User.findOne({username})
    .then(existingUser => {
        if(existingUser) {
            next({
                log: 'Express error handler caught unknown middleware error',
                status: 409,
                message: {err: 'An error occurred'}
            })
        }
        res.locals.username = username
        res.locals.password = password
        return next();
    })
    .catch(err => {
        next(err)
    })
}

userController.setCookie = (req,res,next) => {
    console.log('inside setCookie func')
    const username = res.locals.username;
    console.log('username', username)
    res.cookie('username', username, { httpOnly : false});
    return next()
}

userController.addList = (req,res,next) => {
    console.log('inside of addList middleware')
    console.log(req.cookies.username)
    User.findOneAndUpdate({username: req.cookies.username}, { $push: { lists: req.body } }, { new: true })
    .then(result => {
        console.log('inside of .then in addList middleware')
        console.log(result.json())
        res.locals.new = result
        next()
    })
    .catch(err => {
        next(err)
    })

}

userController.getTodos = (req,res,next) => {
    console.log('inside of getTodos middleware')
    const listName = req.params.name;
    console.log(listName)

    User.findOne({
        username: req.cookies.username,
        lists: {
          $elemMatch: { name: listName }
        }
      })
      .then(result => {
        const list = result.lists.find((el) => el.name === listName);
        res.locals.list = list;
        return next();
      }) 
      .catch(err => {
        next(err);
      })

    
     }

userController.addTodo = (req,res,next) => {
    console.log('WE MADE IT TO THE ADDTODO MIDDLEWARE WOOHOO')
    
    const listName = req.params.name;
    const enteredTitle = req.body.todos;

    console.log('listname: ', listName)
    console.log('enteredtitle:', enteredTitle)

  // Find the user with the username stored in req.cookies
  User.findOneAndUpdate(
    { 
      username: req.cookies.username,
      "lists.name": listName // Find the document in the array with the matching name
    },
    {
      $push: { "lists.$.todos": enteredTitle } // Use the $ positional operator to push to the todos array of the matching document
    },
    { 
      new: true 
    }
  )
  .then(updatedUser => {
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
  
    const list = updatedUser.lists.find((list) => list.name === listName);
    console.log('inside of userFindOneAndUpdate')
    console.log('updated' , list.todos)
  
    return next()
  })
  .catch(err => next(err));
    
}

module.exports = userController;