const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validatePassword = (senha) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?~-])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?~-]{8,}$/;
  return regex.test(senha);
};

export { validateEmail, validatePassword };
