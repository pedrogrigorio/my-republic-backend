import { StorageService } from './storage.service.interface';
import * as path from 'path';
import * as fs from 'fs';

export class LocalStorageService implements StorageService {
  private readonly uploadPath = path.join(__dirname, '../../../../../uploads');

  async upload(file: Express.Multer.File): Promise<string> {
    const filename = Date.now() + '-' + file.originalname;
    const filePath = path.join(this.uploadPath, filename);

    fs.writeFileSync(filePath, file.buffer);

    const publicUrl = 'http://localhost:3001/pictures/' + filename;

    return publicUrl;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const filename = fileUrl.split('/').pop();
    const filePath = path.join(this.uploadPath, filename);

    await fs.promises.unlink(filePath);
  }
}
