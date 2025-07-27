/**
 * @function ageConverter -> DOB to age
 */

const ageConverter = (age) => {
  const today = new Date();
  const dob = new Date(age);
  return today.getFullYear() - dob.getFullYear();
};

export default ageConverter;
