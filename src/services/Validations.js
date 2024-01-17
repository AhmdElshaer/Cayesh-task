export function ValidateUserName (userName) {
  const regex = /^[\d+]|[\w+]$/;
  return regex.test(userName);
}
export function ValidatePassword (password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  return regex.test(password);
}