import { UntypedFormControl } from '@angular/forms';

export const noWhitespace = (control: UntypedFormControl) => {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
};
