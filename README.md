##  Screen Loader

Modularize every "screen" of your app by using Screen Loader.  Each screen gets a unique URL slug based on the module name.

Used as a client-side module via Browserify. 

```
npm install screen-loader
```


### Load some screens

```
//app.js 

//Create an object containing your required screens. 
var screens = {}
screens.dashboardLogin = require('../screens/dashboard-login')
screens.dashboardProfile = require('../screens/dashboard-profile')

screenLoader(screens)
```

Each "screen" should have an "init" function which will get called on page-load.  You should also name your screen modules with camelCase noting that each instance of an uppercase letter will denote a "/" in the public URL you use to access said screen.   Ie: dashboardLogin screen will live at "http://localhost/dashboard/login" in your app.

```
//screens/dashboard-login/screen.js

screen = {
  init : function() {
    console.log('Init dashboard login screen.')
    //Do stuff
  }
}
module.exports = screen
```

Now in the browser when you visit http://localhost/dashboard-login this screen's init function will run.
