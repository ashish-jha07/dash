import { TestBed } from '@angular/core/testing';

import { AuthenttticationService } from './authentttication.service';

describe('AuthenttticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenttticationService = TestBed.get(AuthenttticationService);
    expect(service).toBeTruthy();
  });
});
