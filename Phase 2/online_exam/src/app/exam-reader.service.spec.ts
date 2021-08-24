import { TestBed } from '@angular/core/testing';

import { ExamReaderService } from './exam-reader.service';

describe('ExamReaderService', () => {
  let service: ExamReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
