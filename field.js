var _ = require('underscore')
var S = require('string');

var build = {
  type: function(fieldObject, fieldInfo, fieldOptions) {
    if (!_.isString(fieldObject.type)) {
      return fieldObject.type.name;
    }
  },

  label: function(fieldObject, fieldInfo, fieldOptions) {
    // Can depend on name being there.
    return fieldObject.getName('label');
  },

  widget: function(fieldObject, fieldInfo, fieldOptions) {
    var widget = fieldObject.widget || '';
    if (fieldObject.type == 'Number')
      widget = 'number';

    else if (fieldObject.type == 'String')
      widget = 'text';

    return widget;
  },

  choices: function(fieldObject, fieldInfo, fieldOptions) {
    var choices = {};
    if (!_.isUndefined(fieldInfo.choices)) {
      if (_.isArray(fieldInfo.choices)) {
        _.each(choicesList, function(element, index) {
          choices[element] = element;
        });
      }
      if (_.isFunction(fieldInfo.choices)) {
        // If it's a function, execute.
        // TODO -- async.
        choices = fieldInfo.choices(fieldObject, fieldInfo, fieldOptions);
      }
    }
    return choices;
  }
};

// Constructor
function Field(fieldInfo, formOptions) {
  var fieldInfo = fieldInfo || {};
  var formOptions = formOptions || {};
  // Set proper defaults;
  var defaults = {
    type: String,
    name: 'fieldName',
    label: 'fieldLabel',
    widget: 'text',
    required: false,
    choiceOther:false,
    default: '',
    multiple: false,
    prefix: '',
    suffix: '',
    immediateParent: '',
    parents:[],
    choices: []
  };

  var field = _.extend(_.clone(defaults), fieldInfo);

  // Construct each element using private builders.
  _.each(field, function(element, index) {
    this[index] = element;
    if (build[index] && (_.isEmpty(element) || element == defaults[index])) {
      this[index] = build[index](this, fieldInfo, formOptions);
    }
  }, this);
}

// class methods
Field.prototype.getName = function(use) {
  if (use && S(this.name).contains('.')) {
    var brokenPath = this.name.split('.');
    if (use == 'direct') {
      return brokenPath.pop();
    }
    if (use == 'label') {
      return S(brokenPath.pop()).humanize().s;
    }
    // Form array fields.
    else {
      var name = '';
      _.each(brokenPath, function(element, index){
        name += index == 0 ? element : "[" + element + "]";
      });
      return name;
    }
  }
  return use == 'label' ? S(this.name).humanize().s : this.name;
};

Field.prototype.getRenderConfig = function() {
  var exportedField = _.clone(this);
  exportedField.header = exportedField.label;
  exportedField.name = this.getName('form');
  return exportedField;
}

// export the class
module.exports = Field;
