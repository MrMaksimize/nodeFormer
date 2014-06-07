var _ = require('underscore')
var S = require('string');
var Field = require('./field');

// Constructor
function Form(formConfig) {
  // Always initialize all instance properties
  this.fields = formConfig.fields;
  this.options = _.extend({
    choicesList: []
  }, formConfig.options);

  _.each(this.fields, function(config, confName) {
    // Infer field name.
    config.name = _.isUndefined(config.name) ? confName : config.name;
    this.fields[confName] = new Field(config, this.options);
  }, this);
}

// TODO - dep this
Form.prototype.getFieldsForRender = function() {
  var fieldsForRender = {};
  _.each(this.fields, function(field, fieldKey) {
    fieldsForRender[fieldKey] = field.getRenderConfig();
  }, this);
  // @TODO -- this should be getting taken care of at fromSchema.
  return _.omit(fieldsForRender, ['__v', '_id']);
};

// Overload constructor for constructing from a conf object.

Form.fromConf = function(conf, extraParams) {
};

// Overload constructor.
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
    path = _.isEmpty(path.caster) ? path : path.caster;
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
