var _ = require('underscore');
var string = require('string');
/***** Title *****/
// Verify we overrode the label from schema on the title field.
// Verify we override the required indicator
// Verify we properly set the text widget for string field.
/***** Purpose *****/
// Verify we override the widget properly.
// Verify that the label is properly generated.
/***** Can Be Reapplied For *****/
// Verify that default is properly set to false.
// Verify that required defaults to false.
// Verify that widget overrides properly.
// Verify label is properly created.
// Verify that choices are set properly from external file.
/***** Paperwork Required *****/
// Verify that multiplicity gets properly handled.
/***** Application Cost *****/
// Verify prefix is handled.
// Verify Number field properly set.
// Verify Required.
/***** Agency *****/
// Verify nesting
// Verify widget overrides.
/***** Additional Demographics *****/
// Verify choices are properly set through config.

var formConfig = {
    options: {},
    fields: {
      // We should be able to infer the widget from this.
      title:  { type: String, required: true, unique: true, label: 'Program Title'},
      // We should be able to infer the label from this.
      purpose: { type: String, required: true, widget: 'textArea' },
      canBeReappliedFor: {
        type: String,
        default: false,
        widget: 'select'
      },
      // A string type field with a checkbox widget that will need to find choices and have an other field.
      eligibleBusinessLocation: {
        type: String,
        required: true,
        choiceOther: false,
        widget: 'checkbox',
      },
      // A multiple text area field.
      paperworkRequired: [{ type: String, widget: 'textArea' }],
      // A number field that is also required.
      applicationCost: { type: Number, required: true},
      // A date field.
      applicationDeadline: { type: Date, required: true, widget: 'date' },
      // Some nested fields.
      agency: {
        name: { type: String, required: true, label: 'Agency Name' },
        agencyContact: {
          name: { type: String, required: true, label: 'Agency Contact Name' },
          email: { type: String, required: true, label: 'Agency Contact Email', widget: 'email' },
          phone: { type: String, required: true, label: 'Agency Contact Phone', widget: 'phone' }
        }
      },
      // Field with choices supplied in config.
      additionalDemographics:[{
        type: String,
        required: true,
        widget: 'checkbox',
        choices: ['student', 'veteran', 'minority']
      }]
    }
};

exports.formConfig = formConfig;

