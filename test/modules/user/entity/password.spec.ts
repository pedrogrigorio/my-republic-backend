import { UserFactory } from '@test/factories/user.factory';

describe('Password', () => {
  it('should be able to create a strong password', () => {
    const user = UserFactory.createUser({ password: 'strongPassword123!@#' });

    expect(user).toBeTruthy();
  });

  it('should not be able to create a password with less than 8 characters', () => {
    expect(() => UserFactory.createUser({ password: 'aaaaaaa' })).toThrow();
  });

  it('should not be able to create a password without numbers', () => {
    expect(() =>
      UserFactory.createUser({ password: 'password123!@#' }),
    ).toThrow();
  });

  it('should not be able to create a password without special characters', () => {
    expect(() => UserFactory.createUser({ password: 'Password123' })).toThrow();
  });

  it('should not be able to create a password without uppercase letters', () => {
    expect(() =>
      UserFactory.createUser({ password: 'password123!@#' }),
    ).toThrow();
  });

  it('should not be able to create a password without lowercase letters', () => {
    expect(() =>
      UserFactory.createUser({ password: 'PASSWORD123!@#' }),
    ).toThrow();
  });
});
