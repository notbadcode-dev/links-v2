import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('starts with loading=false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('sets loading=true when increment is called', () => {
    service.increment();

    expect(service.isLoading()).toBe(true);
  });

  it('does not decrement below zero', () => {
    service.decrement();
    service.decrement();

    expect(service.isLoading()).toBe(false);
  });
});
