/**
 * validatePassword
 * ---
 *
 * ---
 *
 * Returns a boolean to indicate a password's validity.
 *
 * @param password
 * The password string to be validated.
 */

let validatePassword = (password: string) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

export default validatePassword;
