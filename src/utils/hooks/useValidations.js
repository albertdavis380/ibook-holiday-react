const useValidations = () => {
  const validateEmail = (email) => {
    let emailPattern = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return emailPattern.test(email);
  };

  const onlyNumbers = (str) => {
    let numPattern = /^\d+$/;

    return numPattern.test(str);
  };


  const validPasswords = (password) => {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const minLengthRegExp = /.{8,}/;
    // eslint-disable-next-line
    const specialCharRegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    const passwordLength = password.length;

    const uppercasePassword = uppercaseRegExp.test(password);
    const lowercasePassword = lowercaseRegExp.test(password);
    const digitsPassword = digitsRegExp.test(password);
    const charsPassword = specialCharRegExp.test(password);
    const minLengthPassword = minLengthRegExp.test(password);
    return {
      passwordLength,
      uppercasePassword,
      lowercasePassword,
      digitsPassword,
      charsPassword,
      minLengthPassword,
    };
  };

  return {
    validateEmail,
    validPasswords,
    onlyNumbers,
   
  };
};

export default useValidations;
