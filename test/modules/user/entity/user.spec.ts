import { InvalidPasswordException } from '@src/modules/user/domain/exceptions/invalid-password.exception';
import { InvalidEmailException } from '@src/modules/user/domain/exceptions/invalid-email.exception';
import { UserFactory } from '@test/factories/user.factory';
import { Genre } from '@src/core/enums/genre';

describe('User Entity', () => {
  it('should be able to create a user', () => {
    const user = UserFactory.createUser();

    expect(user).toBeTruthy;
  });

  it('should not create a user with invalid email', () => {
    expect(() => UserFactory.createUser({ email: 'invalid-email' })).toThrow(
      InvalidEmailException,
    );
  });

  it('should not create a user with invalid password', () => {
    expect(() =>
      UserFactory.createUser({ password: 'invalidpassword' }),
    ).toThrow(InvalidPasswordException);
  });

  it('should not create a user with invalid genre', () => {
    expect(() => UserFactory.createUser({ genre: 2 as Genre })).toThrow();
  });
});
