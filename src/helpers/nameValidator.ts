/**
 * validateFullname
 * ---
 *
 * ---
 *
 * Returns a boolean to indicate a full name's validity.
 *
 * @param fullname
 * The full name string to be validated.
 */

 let validateName = (name: string) => {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(name);
  };
  
  export default validateName;
  