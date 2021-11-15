/**
 * validateEmail
 * ---
 *
 * ---
 *
 * Returns a boolean to indicate an email validity.
 *
 * @param email
 * The email string to be validated.
 */

export default function validateEmail(email: string) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}
