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
    options: {
      choicesList: {
        canBeReappliedFor: ['No', 'Yes'],
        eligibleBusinessLocation: [
          'Anywhere In Puerto Rico',
          'Municipality in Puerto Rico',
          'Region in Puerto Rico',
          'Outside of Puerto Rico'
        ],
      },
      'agency.type': ['government', 'non-profit']
    },
    fields: {
      // We should be able to infer the widget from this.
      title:  {
        type: String,
        required: true,
        unique: true,
        label: 'Program Title',
        tests: 'inferWidget,overrideLabel,overrideRequired'
      },
      // We should be able to infer the label from this.
      purpose: {
        type: String,
        required: true,
        widget: 'textArea',
        tests: 'overrideWidget,inferLabel,overrideRequired'
      },
      canBeReappliedFor: {
        type: String,
        default: false,
        widget: 'select',
        tests: 'overrideWidget,inferLabel,setDefaultValue,getChoicesFromOptions'
      },
      // A string type field with a checkbox widget that will need to find choices and have an other field.
      // TODO -- test and implement choice other.
      eligibleBusinessLocation: {
        type: String,
        required: true,
        widget: 'checkbox',
        tests: 'overrideWidget,inferLabel,overrideRequired,getChoicesFromOptions'
      },
      // A multiple text area field.
      paperworkRequired: [{
        type: String,
        widget: 'textArea',
        tests: 'overrideWidget,inferLabel,setMultiple,inferRequired,inferDefault'
      }],
      // A number field that is also required.
      applicationCost: {
        type: Number,
        required: true,
        tests: 'inferWidget,inferLabel,setMultiple,inferRequired,inferDefault'
      },
      // A field that attempts to pass a unique name.
      aFieldWithNoName: {
        type: String,
        required: true,
        name: 'clintEastwood',
        tests: 'inferWidget,inferLabel,overrideRequired,overrideName'
      },
      // A date field.
      applicationDeadline: {
        type: Date,
        required: true,
        widget: 'date',
        tests: 'overrideWidget,overrideRequired'
      },
      // Some nested fields.
      agency: {
        aFieldWithNoNameNested: {
          type: String,
          required: true,
          name: 'clintEastwoodNested',
          tests: 'inferWidget,inferLabel,overrideRequired,overrideName'
        },
        aMultipleFieldNested:[{
          type: String,
          required: true,
        }],
        name: {
          type: String,
          required: true,
          label: 'Agency Name',
          tests: 'nestedL1'
        },
        agencyType: {
          type: String,
          required: true,
          widget: 'select',
          label: 'AgencyType',
          tests: 'getChoicesFromConfig'
        },
        agencyContact: {
          name: {
            type: String,
            required: true,
            label: 'Agency Contact Name',
            tests: 'nestedL2'
          },
          email: {
            type: String,
            required: true,
            label: 'Agency Contact Email',
            widget: 'email',
            tests: 'nestedL2'
          },
          phone: {
            type: String,
            required: true,
            label: 'Agency Contact Phone',
            widget: 'phone',
            tests: 'nestedL2'
          }
        }
      },
      // Field with choices supplied in config.
      additionalDemographics:[{
        type: String,
        required: true,
        widget: 'checkbox',
        choices: ['student', 'veteran', 'minority'],
        tests: 'getChoicesFromConfig,setMultiple'
      }]
    }
};

exports.formConfig = formConfig;

