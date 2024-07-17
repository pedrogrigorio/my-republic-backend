import { InvalidEmailException } from '@src/modules/user/domain/exceptions/invalid-email.exception';
import { UserFactory } from '@test/factories/user.factory';

describe('Email', () => {
  it('should be able to create a user with a valid email', () => {
    const user = UserFactory.createUser({ email: 'valid.email@example.com' });

    expect(user).toBeTruthy();
  });

  it('should not be able to create a user with an invalid email', () => {
    expect(() => UserFactory.createUser({ email: 'invalid-email' })).toThrow(
      InvalidEmailException,
    );
  });
});
