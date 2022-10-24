import { Test, TestingModule } from '@nestjs/testing';
import { CryptoUtilsService } from './crypto-utils.service';

describe('CryptoUtilsService', () => {
  let service: CryptoUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoUtilsService],
    }).compile();

    service = module.get<CryptoUtilsService>(CryptoUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
