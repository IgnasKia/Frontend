import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoinCollectionComponent } from './user-coin-collection.component';

describe('UserCoinCollectionComponent', () => {
  let component: UserCoinCollectionComponent;
  let fixture: ComponentFixture<UserCoinCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCoinCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCoinCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
