import { AbstractControl, ValidationErrors } from '@angular/forms';

export const iso8601FutureDateValidator: (
  control: AbstractControl,
) => ValidationErrors | null = (
  control: AbstractControl,
): ValidationErrors | null => {
  if (!control.value) return null; // No validar si está vacío

  const iso8601Regex: RegExp =
    /^\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/;

  const value: string = String(control.value).trim();

  if (!iso8601Regex.test(value)) {
    return { iso8601: 'Date must be a valid ISO 8601 date string' };
  }

  const inputDate: Date = new Date(value);
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0); // Comparar solo fecha

  if (isNaN(inputDate.getTime())) {
    return { iso8601: 'Invalid date value' };
  }

  if (inputDate <= today) {
    return { futureDate: 'Date must be greater than today' };
  }

  return null;
};
