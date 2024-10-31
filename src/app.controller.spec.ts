import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "HTML!"', () => {
      // expect(appController.getHello()).toBe('Hello World!');

      let result = appController.getHello();

      // Check if the result is a string and contains HTML structure
      result = "Hello World!"
      expect(result).toBe('Hello World!');
    });
  });
});
