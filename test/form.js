var _ = require('underscore');
var string = require('string');
var chai = require('chai');
var should = chai.should();
var nodeFormer = require('../form.js');
var mongoose = require('mongoose');
var mocks = require('./mocks.js');

describe('Form', function() {
  // Set up the forms.
  var formConfig = mocks.formConfig;

  // Mock schema from above configurations.
  var schema = new mongoose.Schema(formConfig.fields);

  it('should set proper defaults on initialization', function() {
    var form = new nodeFormer(formConfig);
    // Test that name properly got inferred on the fields and placed properly.
    form.fields.yourName.name.should.equal('yourName');
    form.fields.yourName.label.should.equal('Your name');
    // Test that the proper widget was inferred from the type.
    form.fields.yourName.widget.should.equal('text');
    // Check that choices list got set to blank.
    form.options.choicesList.should.be.an('array');
  });

  it('should create itself from a schema', function() {
    var form = nodeFormer.fromSchema(schema);
    console.log(form);
    // We need to test everything from the overloaded constructor
    // to the point where it's passed off to the field system.
    // Verify that nested fields properly got broken down;
    // Verify that choices properly got injected at the form level.
    // Verify that multiple fields properly got handled.
  });

  /*it('should properly translate schema to form configurations', function(){
    var form = nodeFormer.fromSchema(schema);
    var refFields = formConfig.fields;
    console.log(refFields.title.type.name);
  });*/


});


