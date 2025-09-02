import Chance from 'chance';
const chance = new Chance();


export function generateRandomEmail() {
  return chance.email();
}

export function generateRandomPhone() {
  return chance.phone({ formatted: false });
}


export function randomPassword() { return chance.string({
  length: 6,       // password length
  pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
});
}
