export class ValidateService {
  constructor() {}

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      min: `${validatorValue.min}`,
      max: `${validatorValue.max}`,
      minlength: `${validatorValue.requiredLength}`,
      maxlength: `${validatorValue.requiredLength}`,
    };

    return config[validatorName];
  }
}
