var _ = require('underscore');
var S = require('string');
var chai = require('chai');
var should = chai.should();
var nodeFormer = require('../form.js');
var mongoose = require('mongoose');
var mocks = require('./mocks.js');

var formTester = {
  elementName: function(form) {
    // Top Level Field Inference
    form.fields['applicationCost'].name.should.equal('applicationCost');
    form.fields['applicationCost'].label.should.equal('Application cost');
    // Top Level Field Override
    form.fields['aFieldWithNoName'].name.should.equal('clintEastwood');
    form.fields['aFieldWithNoName'].label.should.equal('Clint eastwood');
    // Nested Field Inferrence.
    form.fields['agency.agencyContact.name'].name.should.equal('agency.agencyContact.name');
    form.fields['agency.agencyContact.name'].label.should.equal('Agency Contact Name');
    // Nested Field Override.
    form.fields['agency.aFieldWithNoNameNested'].name.should.equal('clintEastwoodNested');
    form.fields['agency.aFieldWithNoNameNested'].label.should.equal('Clint eastwood nested');
  },
  multiplicityTest: function(form) {
    form.fields.paperworkRequired.multiple.should.be.true;
    form.fields.additionalDemographics.multiple.should.be.true;
    form.fields['agency.aMultipleFieldNested'].multiple.should.be.true;
    form.fields.purpose.multiple.should.be.false;
  }
};

describe('Form', function() {
  // Set up the forms.
  var formConfig = mocks.formConfig;

  // Mock schema from above configurations.
  var schema = new mongoose.Schema(formConfig.fields);

  var forms = {
    fromSchema: nodeFormer.fromSchema(schema, formConfig.options),
    fromConfig: nodeFormer.fromConfig(formConfig.fields, formConfig.options)
  };
  describe ('fromSchema', function(){
    it('should infer element name from schema', function() {
      formTester.elementName(forms.fromSchema);
    });

    it('should set multiples from schema', function() {
      formTester.multiplicityTest(forms.fromSchema);
    });
  });

  describe('fromConfig', function() {

    it('should build nested field keys correctly');
    it('should infer element name from config', function() {
      formTester.elementName(forms.fromConfig);
    });

    it('should set multiples from schema', function() {
      formTester.multiplicityTest(forms.fromConfig);
    });

  });

  it('schema and conf object config should generate same form config', function() {});

});

