function validateFields(
  email: string,
  password: string
): {
  error: boolean;
  msg?: string;
} {
  if (email === '') {
    return { error: true, msg: "Email address can't be blank" };
  }

  if (password === '') {
    return { error: true, msg: "Password can't be blank" };
  }

  return { error: false };
}

export { validateFields };
