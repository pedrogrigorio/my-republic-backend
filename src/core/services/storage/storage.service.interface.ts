export abstract class StorageService {
  abstract upload(file: Express.Multer.File): Promise<string>;
  abstract deleteFile(fileUrl: string): Promise<void>;
}
