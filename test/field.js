var _ = require('underscore');
var string = require('string');
var chai = require('chai');
var should = chai.should();
var fixtures = require('./fixtures');
var Field = require('../field');

describe('Field', function() {
  before(function() {
  });

  it ('should throw error when name is not passed', function() {
    try {
      var field = new Field();
    } catch(err) {
      err.message.should.equal('Cannot be missing name');
    }
  });

  it ('should set proper defaults', function() {
    var defaults = {
      fieldName: 'monkeyField',
      fieldLabel: 'Monkey field',
      widget: 'text',
      required: false,
    }
    var fieldInfo = { name: defaults.fieldName };
    var fieldOptions = { choices: [] };
    var field = new Field(fieldInfo, fieldOptions);
    field.name.should.equal(defaults.fieldName);
    field.label.should.equal(defaults.fieldLabel);
    field.widget.should.equal(defaults.widget);
    field.required.should.be.false;
    field.choices.should.be.an('object');
  });


});
