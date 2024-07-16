import { Genre } from '@src/core/enums/genre';
import { User } from './user';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123',
      imgSrc: 'https://example.com/images/johndoe.jpg',
      genre: Genre.MALE,
    });

    expect(user).toBeTruthy;
  });
});
