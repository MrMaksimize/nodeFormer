var _ = require('underscore');
var string = require('string');
var chai = require('chai');
var should = chai.should();
var nodeFormer = requre('../form.js');

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
});

