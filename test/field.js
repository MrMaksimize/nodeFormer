var _ = require('underscore');
var S = require('string');
var chai = require('chai');
var should = chai.should();
var nodeFormer = require('../form');
var Field = require('../field');
var mongoose = require('mongoose');
var mocks = require('./mocks.js');

var fieldTester = {
  inferWidget: function(config, result) {
  }
};

describe ('Field', function() {
  var formConfig = mocks.formConfig;

  // Mock schema from above configurations.
  var schema = new mongoose.Schema(formConfig.fields);

  var forms = {
    fromSchema: nodeFormer.fromSchema(schema, formConfig.options),
  };

  describe('Simple', function(){});
    it('should infer widget based on type, but allow override');
    it('shold infer label based on name, but allow override');
    it('should set required false by default, but allow override');
    it('should set default as empty string, but allow override');
    it('should set multiple to false, but allow override');
    it('should set prefix as empty string, but allow override');
    it('should set suffix as empty string, but allow override');
    it('should be able to set choices from within field configuration');
    it('should be able to get choices from a callback method');
    it('should properly set default choices');
    it('should properly set default classes');
    it('should properly set classes?');
    it('allow for field overloads as necessary');
    it('should get its own name based on use');
    it('should successfully generate its own render configuration');
    it('should correctly default and set choiceOther');
  describe('Multiple', function(){});
  describe('Nested', function(){});
});

describe('Simple Field Operations', function() {
  before(function() {
  });


  it ('should set proper defaults when nothing is passed', function() {
    var field = new Field();
    field.name.should.equal('fieldName');
    field.label.should.equal('Field name');
    field.widget.should.equal('text');
    field.required.should.be.false;
    field.choices.should.be.an('object');
  });

  it ('should let me override the label on creation', function() {
    var field = new Field({name: 'someField', label: 'A Great Unrelated Label'});
    field.label.should.equal('A Great Unrelated Label');
  });

  it ('should infer at minimum configuration', function() {
    var fieldConf = {
      fieldName: 'monkeyField',
      fieldLabel: 'Monkey field',
      widget: 'text',
      required: false,
      default: '',
      multiple: false,
      prefix: '',
      suffix: ''
    }
    var fieldInfo = { name: fieldConf.fieldName };
    var fieldOptions = { choices: [] };
    var field = new Field(fieldInfo, fieldOptions);
    field.name.should.equal(fieldConf.fieldName);
    field.label.should.equal(fieldConf.fieldLabel);
    field.widget.should.equal(fieldConf.widget);
    field.required.should.be.false;
    field.choices.should.be.an('object');
  });

  it ('should get its own name properly based on use', function() {
    var complexField = new Field({ name: 'levelOne.levelTwo.levelThree' });
    var simpleField = new Field({ name: 'simpleFieldName' });

    // Complex Field;
    complexField.getName('direct').should.equal('levelThree');
    complexField.getName('label').should.equal('Level three');
    complexField.getName('form').should.equal('levelOne[levelTwo][levelThree]');

    // Simple Field;
    simpleField.getName('direct').should.equal('simpleFieldName');
    simpleField.getName('label').should.equal('Simple field name');
    simpleField.getName('form').should.equal('simpleFieldName');

  });

  it ('should properly get its own render config', function() {
    var field = new Field({ name: 'something.awesomeName' });
    var renderConfig = field.getRenderConfig();
    renderConfig.label.should.equal('Awesome name');
    renderConfig.header.should.equal(renderConfig.label);
    renderConfig.name.should.equal('something[awesomeName]');
  });

});

describe('Field configuration translations and inference', function() {
  var form = {};
  before(function() {
    // Use from schema for now, but @TODO switch to using from conf
    var formConfig = mocks.formConfig;
    // Mock schema from above configurations.
    var schema = new mongoose.Schema(formConfig.fields);
    form = nodeFormer.fromSchema(schema, formConfig.options);
  });

  it('should determine proper widget from type', function() {
    // String
    form.fields.title.widget.should.equal('text');
    // Number
    form.fields.applicationCost.widget.should.equal('number');
    // Date
    form.fields.applicationDeadline.widget.should.equal('date');
    // Boolean
    // Nested
    form.fields['agency.agencyContact.name'].widget.should.equal('text');
  });

  it('should get choices based on type and where they are passed', function() {
  });

  it('should properly deal with nested structures', function() {});
  it('should default to required false unless explicit', function(){
     // Check that we can override the required;
     form.fields.title.required.should.be.true;
     // And that it sets as default.
     form.fields.canBeReappliedFor.required.should.be.false;
  });
  it('should have capability to infer labels from names', function(){
    // Check that we can override the label;
    form.fields['agency.agencyContact.name'].label.should.equal('Agency Contact Name');
    form.fields.title.label.should.equal('Program Title');
    // And that the system can infer it.
    form.fields.canBeReappliedFor.label.should.equal('Can be reapplied for');
    form.fields.applicationCost.label.should.equal('Application cost');
  });
  it('should handle default fields', function(){
    // Lets make sure that default is always blank unless passed and overriden.
    form.fields.title.default.should.equal('');
    form.fields.canBeReappliedFor.default.should.be.false;
  });
  it('should have capability to override widget in configuration', function(){
    // Default widget should fall to text for strings.
    form.fields.title.widget.should.equal('text');
    form.fields['agency.agencyContact.name'].widget.should.equal('text');
    // Overriden widget
    form.fields.purpose.widget.should.equal('textArea');
    form.fields['agency.agencyContact.email'].widget.should.equal('email');
  });
  it('should flag multiplicity if passed');
  it('should properly set suffix and prefix.');

});


