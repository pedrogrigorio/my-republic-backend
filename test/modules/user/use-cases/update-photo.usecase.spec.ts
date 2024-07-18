import { UpdatePhotoUseCase } from '@src/modules/user/application/use-cases/update-photo.usecase';
import { InMemoryUserRepository } from '@src/modules/user/infrastructure/repositories/in-memory-user-repository';
import { UserFactory } from '@test/factories/user.factory';

describe('Update Photo Use Case', () => {
  it('should be able to update photo of an existing user', async () => {
    const userRepository = new InMemoryUserRepository();
    const updatePhoto = new UpdatePhotoUseCase(userRepository);

    const user = await userRepository.create(UserFactory.makeEntity());

    const filename = 'example.png';

    const updatedUser = await updatePhoto.execute(filename, user.id);

    expect(updatedUser.imgSrc).toContain(filename);
  });
});
