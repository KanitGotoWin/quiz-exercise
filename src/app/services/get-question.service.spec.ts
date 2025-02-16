import { TestBed } from '@angular/core/testing';

import { GetQuestionService } from './get-question.service';

describe('GetQuestionService', () => {
  let service: GetQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
