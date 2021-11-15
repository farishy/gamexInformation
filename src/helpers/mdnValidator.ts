/**
 * validatePhoneNumber
 * ---
 *
 * ---
 *
 * Returns a boolean to indicate a phone number's validity.
 *
 * @param mdn
 * The phone number string to be validated.
 */

let validateMdn = (mdn: string) => {
  return /^(\+628|628|08|8)\d{5,30}/.test(mdn);
};

export default validateMdn;
