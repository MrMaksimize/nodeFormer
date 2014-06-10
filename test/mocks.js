var _ = require('underscore');
var string = require('string');
var formConfig = {
    options: {},
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
        choiceOther: true,
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

