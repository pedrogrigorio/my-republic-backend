import { InvalidEmailException } from '@src/modules/user/domain/exceptions/invalid-email.exception';
import { InvalidGenreException } from '@src/modules/user/domain/exceptions/invalid-genre.exception';
import { UserFactory } from '@test/factories/user.factory';
import { Gender } from '@src/core/enums/genre';

describe('User Entity', () => {
  it('should be able to create a user', () => {
    const user = UserFactory.makeEntity();

    expect(user).toBeTruthy;
  });

  it('should not create a user with invalid email', () => {
    expect(() => UserFactory.makeEntity({ email: 'invalid-email' })).toThrow(
      InvalidEmailException,
    );
  });

  it('should not create a user with invalid genre', () => {
    expect(() => UserFactory.makeEntity({ genre: 2 as Gender })).toThrow(
      InvalidGenreException,
    );
  });
});
