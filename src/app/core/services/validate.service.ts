export class ValidateService {

    constructor() { }

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      const config = {
        required: 'Required',
        whitespace: 'Can not be empty',
        email: 'Invalid email address',
        min: `Minimum ${validatorValue.min}`,
        max: `Maximum ${validatorValue.max}`,
        minlength: `Minimum length ${validatorValue.requiredLength}`,
        maxlength: `Maximum length ${validatorValue.requiredLength}`,
      };

      return config[validatorName];
    }
}
