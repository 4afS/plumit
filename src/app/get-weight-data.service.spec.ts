import { TestBed } from '@angular/core/testing';

import { GetWeightDataService } from './get-weight-data.service';

describe('GetWeightDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetWeightDataService = TestBed.get(GetWeightDataService);
    expect(service).toBeTruthy();
  });
});
