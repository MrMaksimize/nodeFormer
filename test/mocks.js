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
      },
      // We should be able to infer the label from this.
      purpose: {
        type: String,
        required: true,
        widget: 'textArea',
      },
      canBeReappliedFor: {
        type: String,
        default: false,
        widget: 'select',
	choices: ['Yes', 'No']
      },
      // A string type field with a checkbox widget that will need to find choices and have an other field.
      // TODO -- test and implement choice other.
      eligibleBusinessLocation: {
        type: String,
        required: true,
        widget: 'checkbox',
        choiceOther: true,
	choices: { 'puerto_rico': 'Puerto Rico', 'united_states': 'United States' }
      },
      // A multiple text area field.
      paperworkRequired: [{
        type: String,
        widget: 'textArea',
      }],
      // A number field that is also required.
      applicationCost: {
        type: Number,
        required: true,
      },
      // A field that attempts to pass a unique name.
      aFieldWithNoName: {
        type: String,
        required: true,
        name: 'clintEastwood',
      },
      // A date field.
      applicationDeadline: {
        type: Date,
        required: true,
        widget: 'date',
      },
      // Some nested fields.
      agency: {
        aFieldWithNoNameNested: {
          type: String,
          required: true,
          name: 'clintEastwoodNested',
        },
        aMultipleFieldNested:[{
          type: String,
          required: true,
        }],
        name: {
          type: String,
          required: true,
          label: 'Agency Name',
        },
        agencyType: {
          type: String,
          required: true,
          widget: 'select',
          label: 'AgencyType',
        },
        agencyContact: {
          name: {
            type: String,
            required: true,
            label: 'Agency Contact Name',
          },
          email: {
            type: String,
            required: true,
            label: 'Agency Contact Email',
            widget: 'email',
          },
          phone: {
            type: String,
            required: true,
            label: 'Agency Contact Phone',
            widget: 'phone',
          }
        }
      },
      // Field with choices supplied in config.
      additionalDemographics:[{
        type: String,
        required: true,
        widget: 'checkbox',
        choices: ['student', 'veteran', 'minority'],
      }]
    }
};

exports.formConfig = formConfig;

