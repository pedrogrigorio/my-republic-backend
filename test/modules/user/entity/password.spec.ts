import { UserFactory } from '@test/factories/user.factory';

describe('Password', () => {
  it('should be able to create a strong password', () => {
    const user = UserFactory.makeEntity({ password: 'strongPassword123!@#' });

    expect(user).toBeTruthy();
  });

  it('should not be able to create a password with less than 8 characters', () => {
    expect(() => UserFactory.makeEntity({ password: 'aaaaaaa' })).toThrow();
  });

  it('should not be able to create a password without numbers', () => {
    expect(() =>
      UserFactory.makeEntity({ password: 'password123!@#' }),
    ).toThrow();
  });

  it('should not be able to create a password without special characters', () => {
    expect(() => UserFactory.makeEntity({ password: 'Password123' })).toThrow();
  });

  it('should not be able to create a password without uppercase letters', () => {
    expect(() =>
      UserFactory.makeEntity({ password: 'password123!@#' }),
    ).toThrow();
  });

  it('should not be able to create a password without lowercase letters', () => {
    expect(() =>
      UserFactory.makeEntity({ password: 'PASSWORD123!@#' }),
    ).toThrow();
  });
});
