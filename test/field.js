var _ = require('underscore');
var string = require('string');
var chai = require('chai');
var should = chai.should();
var Field = require('../field');

describe('Field', function() {
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

  it ('should infer at minimum configuration', function() {
    var fieldConf = {
      fieldName: 'monkeyField',
      fieldLabel: 'Monkey field',
      widget: 'text',
      required: false,
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

