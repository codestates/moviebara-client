const validator = (pattern) => {
  return (checkTarget = "") => {
    console.log(pattern, checkTarget);
    return new RegExp(pattern).test(checkTarget);
  };
};

const emailValidator = validator(
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
);

const passwordValidator = validator(/^[A-Za-z0-9]{6,12}$/);

// const emailValidator = (email) => {
//   const pattern = new RegExp(
//     /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
//   );

//   return pattern.test(email);
// };

export { emailValidator, passwordValidator };
