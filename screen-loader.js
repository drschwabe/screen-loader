var _ = require('underscore'), 
    _s = require('underscore.string')

module.exports = function(screens) {
  //"screens" is an object full of the screen modules which have
  //already been required/loaded via Browserify.

  //Create an index of screen names: 
  var screenIndex = _.map(screens, function(screen, key) {
    //Each screen key is camelCase, so let's slug them:    
    return string_to_slug(key)
  })

  //Trim the current path down to the core URL slug: 
  var currentScreenSlug = window.location.pathname.substring(1).replace('.html', '').replace('/', '-')

  //Check to see if there is a corresponding module: 
  if( _.contains(screenIndex, currentScreenSlug)) { //< There is a module.
    //Convert from the slug back to a camelized module name:
    var moduleName = _s.camelize(currentScreenSlug)
    //Now we can call the module's init function: 
    screens[moduleName].init()
  }
}

function string_to_slug(str) {
  //Borrowed from: 
  //http://stackoverflow.com/questions/8991908/how-do-i-enhance-slugify-to-handle-camel-case

  // Separate camel-cased words with a space for later processing. 
  str = str.replace(/[A-Z]/g, function(s){ 
      return " " + s; 
  }); 
    
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;",
      to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(from[i], to[i]);
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
    
  // Trim leading and trailing whitespace and dashes. 
  str = str.replace(/^[\s|-]+|[\s|-]+$/g, '');

  return str;
}
