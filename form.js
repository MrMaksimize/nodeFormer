var _ = require('underscore')
var S = require('string');
var Field = require('./field');
var unflatten = require('flat').unflatten;


/*var nestedFlattener = function(object, prefix) {
  if (_.isUndefined(prefix)) {
    prefix = '';
  }
  else {
    prefix = prefix + '.'
  }
  _.each(object, function(element, index) {
    index = prefix + index;
    if (_.isUndefined(element.type)) {
      console.log('triggered on ' + index);
      if(_.isArray(element)) {
        element = element.pop();
        element.multiple = true;
        object[index] = element;
      }
      else {
        object[index] = nestedFlattener(element, index);
      }
    }
  });
  return object;
};*/

// Constructor
function Form(formConfig) {
  // Always initialize all instance properties
  this.fields = formConfig.fields;
  this.options = _.extend({
    choicesList: []
  }, formConfig.options);

  _.each(this.fields, function(config, confName) {
    // Infer field name.
    var immediateParent = '';
    var parents = [];
    if (S(confName).contains('.')) {
      parents = confName.split('.');
      // Remove last element since that is our current element.
      parents.pop();
      immediateParent = _.last(parents);
    }
    config.immediateParent = immediateParent;
    config.parents = parents;
    config.name = _.isUndefined(config.name) ? confName : config.name;
    this.fields[confName] = new Field(config, this.options);
  }, this);
}

// TODO - dep this
Form.prototype.getRenderObject = function(options) {
  var options = options || {};
  var fieldsForRender = {};
  _.each(this.fields, function(field, fieldKey) {
    fieldsForRender[fieldKey] = field.getRenderConfig();
  }, this);
  // @TODO -- this should be getting taken care of at fromSchema.
  fieldsForRender = _.omit(fieldsForRender, ['__v', '_id']);
  if (options.unflatten) {
    fieldsForRender = unflatten(fieldsForRender, { safe: true, object: true });
  }
  return { options: this.options, fields: fieldsForRender };
};

// Overload constructor for creation from Config.
// This needs to flatten the config, and handle multiples.
Form.fromConfig = function(fields, options) {
  var fields = nestedFlattener(fields);
  console.log('mooo');
  console.log(fields);
  // F THIS S>  IT"S GONNA ONLY WORK WITH MONGOOSE FOR NOW.
};

// Overload constructor for creation from Schema.
Form.fromSchema = function(schema, options) {
  var paths = schema.paths;
  var virtuals = schema.virtuals;
  // Process incoming schema into FormConfig
  // @TODO -- virtuals later.
  var formConfig = {
    options: _.extend({}, options),
    fields: {}
  };
  _.each(paths, function(path, pathName) {
    //path = _.isEmpty(path.caster) ? path : path.caster;
    if (!_.isEmpty(path.caster)) {
      path = path.caster;
      path.options.multiple = true;
    }
    // Restructure mongoose path object
    formConfig.fields[pathName] = _.extend({
      type: path.instance,
      name: path.path,
      validators: path.validators
    }, path.options);
  });
  // If extra params are truly needed, they should be getting injected at this level.
  var instance = new this(formConfig);
  return instance;
}

// export the class
module.exports = Form;
