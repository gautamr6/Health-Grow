// set up Express
var express = require('express');
var app = express();

// set up EJS
app.set('view engine', 'ejs');

// set up BodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var User = require('./User.js');
var Journal = require('./Journal.js');
var Workout = require('./Workout.js');
var Type = require('./WorkoutType.js');
var MealType = require('./MealType.js');
var Meal = require('./Meal.js');
var Mood = require('./Mood.js');

/***************************************/

app.use('/deleteuser', (req, res) => {
  var inputData;

  req.on('data', (data) => {

    inputData = JSON.parse(data);

  });

  req.on('end', () => {

    User.deleteMany({email: inputData.email, password: inputData.password}, (err) => {
      if (err) {
        res.type('html').status(200);
        res.write('uh oh: ' + err);
        console.log(err);
        res.end();
      } else {
        console.log("Done!");
      }
    });
  });
});

app.use('/edituser', (req, res) => {
  var inputData;

  req.on('data', (data) => {

    inputData = JSON.parse(data);

  });
  var newUser;
  req.on('end', () => {

    newUser = new User ({
      email: inputData.email,
      password: inputData.password,
      name: inputData.name,
    });

    var upsertData = newUser.toObject();

    delete upsertData._id;

    User.update({email: newUser.email, password: newUser.password}, upsertData, {upsert: true}, (err) => {
      if (err) {
        res.type('html').status(200);
        res.write('uh oh: ' + err);
        console.log(err);
        res.end();
      } else {
        console.log("Done!");
      }
    });
  });
});

app.use('/createuser', (req, res) => {
  var inputData;

  req.on('data', (data) => {

    inputData = JSON.parse(data);

  });
  var newUser;
  req.on('end', () => {

    newUser = new User ({
      email: inputData.email,
      password: inputData.password,
      name: inputData.name,
    });

    newUser.save( (err) => {
      if (err) {
        res.type('html').status(200);
        res.write('uh oh: ' + err);
        console.log(err);
        res.end();
      }
      else {
        console.log("Done!");
      }
    } );
  });

});

// route for creating a new journal
app.use('/createjournal', (req, res) => {
  var inputData;

  req.on('data', (data) => {

    inputData = JSON.parse(data);

  });
  var newJournal;
  req.on('end', () => {

    newJournal = new Journal ({
      email: inputData.email,
      title: inputData.title,
      text: inputData.text,
    });

    newJournal.save( (err) => {
      if (err) {
        res.type('html').status(200);
        res.write('uh oh: ' + err);
        console.log(err);
        res.end();
      }
      else {
        console.log("Done!");
      }
    } );
  });

});

// route for creating a new journal
app.use('/createmood', (req, res) => {
  var inputData;

  req.on('data', (data) => {

    inputData = JSON.parse(data);

  });
  var newMood;
  req.on('end', () => {

    newMood = new Mood ({
      email: inputData.email,
      rating: inputData.rating,
      tags: inputData.tags,
      text: inputData.text,
    });

    newMood.save( (err) => { 
      if (err) {
        res.type('html').status(200);
        res.write('uh oh: ' + err);
        console.log(err);
        res.end();
      }
      else {
        console.log("Done!");
      }
    } );
  });

});

app.use('/createworkout', (req, res) => {
  var inputData;
  var jsonData = "";

  req.on('data', (data) => {
    jsonData += data
  });
  var newWorkout;
  req.on('end', () => {
    inputData = JSON.parse(jsonData);
    newWorkout = new Workout ({
      email: inputData.email,
      workout: inputData.workout,
      reps: inputData.reps,
      weight: inputData.weight,
      img: inputData.img
    });

    newWorkout.save( (err) => {
      if (err) {
        res.type('html').status(200);
        res.write('uh oh: ' + err);
        console.log(err);
        res.end();
      }
      else {
        console.log("Done!");
      }
    } );
  });

});

app.use('/createmealtype', (req, res) => {
  var inputData;
  var jsonData = "";

  req.on('data', (data) => {
    jsonData += data
  });
  var newMealType;
  req.on('end', () => {
    inputData = JSON.parse(jsonData);
    newMealType = new MealType ({
      name: inputData.name,
      calories: inputData.calories,
      macro: inputData.macro
    });

    newMealType.save( (err) => {
      if (err) {
        res.type('html').status(200);
        res.write('uh oh: ' + err);
        console.log(err);
        res.end();
      }
      else {
        console.log("Done!");
      }
    } );
  });

});


app.use('/createmeal', (req, res) => {
  var inputData;
  var jsonData = "";

  req.on('data', (data) => {
    jsonData += data
  });
  var newMeal;
  req.on('end', () => {
    inputData = JSON.parse(jsonData);
    newMeal = new Meal ({
      email: inputData.email,
      type : inputData.type,
      mealStr : inputData.mealStr
    });

    newMeal.save( (err) => {
      if (err) {
        res.type('html').status(200);
        res.write('uh oh: ' + err);
        console.log(err);
        res.end();
      }
      else {
        console.log("Done!");
      }
    } );
  });

});

app.use('/getalllogsworkout', (req, res) => {
  var inputData;
  var jsonData = "";

  req.on('data', (data) => {
    jsonData += data
    console.log("hi");
  });

  req.on('end', () => {
    inputData = JSON.parse(jsonData);
    console.log(inputData.email);
    Workout.find({email: inputData.email}, (err, workouts) => {
    if (err) {
      res.type('html').status(200);
      res.write('There are no types');
      res.end();
      return;
    }
    var returnArray = [];
    console.log(workouts);
    workouts.forEach( (asdf) => {
        console.log(asdf);
        returnArray.push( { "workouts" : asdf.workout , "reps" : asdf.reps, "weight": asdf.weight} );
    });
    // send it back as JSON Array
    res.json(returnArray);
    } );
  });

});

app.use('/getalllogsmeal', (req, res) => {
  var inputData;
  var jsonData = "";

  req.on('data', (data) => {
    jsonData += data
    console.log("hi");
  });

  req.on('end', () => {
    inputData = JSON.parse(jsonData);
    console.log(inputData.email);
    Meal.find({email: inputData.email}, (err, meals) => {
    if (err) {
      res.type('html').status(200);
      res.write('There are no types');
      res.end();
      return;
    }
    var returnArray = [];
    meals.forEach( (asdf) => {
        returnArray.push( { "type" : asdf.type , "mealStr" : asdf.mealStr} );
    });
    // send it back as JSON Array
    res.json(returnArray);
    } );
  });

});

app.use('/getalllogsmood', (req, res) => {
  var inputData;
  var jsonData = "";

  req.on('data', (data) => {
    jsonData += data
    console.log("hi");
  });

  req.on('end', () => {
    inputData = JSON.parse(jsonData);
    console.log(inputData.email);
    Mood.find({email: inputData.email}, (err, moods) => {
    if (err) {
      res.type('html').status(200);
      res.write('There are no types');
      res.end();
      return;
    }
    var returnArray = [];
    moods.forEach( (asdf) => {
        returnArray.push( { "rating" : asdf.rating} );
    });
    // send it back as JSON Array
    res.json(returnArray);
    } );
  });

});

app.use('/getalllogsjournal', (req, res) => {
  var inputData;
  var jsonData = "";

  req.on('data', (data) => {
    jsonData += data
    console.log("hi");
  });

  req.on('end', () => {
    inputData = JSON.parse(jsonData);
    console.log(inputData.email);
    Journal.find({email: inputData.email}, (err, journals) => {
    if (err) {
      res.type('html').status(200);
      res.write('There are no types');
      res.end();
      return;
    }
    var returnArray = [];
    journals.forEach( (asdf) => {
        returnArray.push( { "title" : asdf.title} );
    });
    // send it back as JSON Array
    res.json(returnArray);
    } );
  });

});



app.use('/signin', (req, res) => {
  var inputData;

  req.on('data', (data) => {

    inputData = JSON.parse(data);

  });

  var isUser;
  req.on('end', () => {
    User.find({email: inputData.email, password: inputData.password}, (err, users) => {
      if (err) {
        res.type('html').status(200);
        console.log('uh oh' + err);
        res.write(err);
      } else {
        if (users.length == 0) {
          isUser = false;
        } else {
          isUser = true;
        }

        res.json({"worked": isUser});
      }
    });
  });

});



app.use('/allmealtype', (req, res) => {

  MealType.find( {}, (err, mealtypes) => {
    if (err) {
      res.type('html').status(200);
      console.log('uh oh' + err);
      res.write(err);
    }
    else {
      if (mealtypes.length == 0) {
        res.type('html').status(200);
        res.write('There are no types');
        res.end();
        return;
      }
      var returnArray = [];
      mealtypes.forEach( (type) => {
        console.log(type);
        returnArray.push( { "types" : type.name } );
        console.log(type.name);
      });
            // send it back as JSON Array
            res.json(returnArray);

          }
        })
});

app.use('/allworkouttype', (req, res) => {

  Type.find( {}, (err, types) => {
    if (err) {
      res.type('html').status(200);
      console.log('uh oh' + err);
      res.write(err);
    }
    else {
      if (types.length == 0) {
        res.type('html').status(200);
        res.write('There are no types');
        res.end();
        return;
      }
      var returnArray = [];
      types.forEach( (type) => {
        returnArray.push( { "name" : type.name } );
      });
            // send it back as JSON Array
            res.json(returnArray);

          }
        })
});


/*************************************************/

app.use('/public', express.static('public'));

app.listen(3000,  () => {
	console.log('Listening on port 3000');
});
