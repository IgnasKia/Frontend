import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoinModalComponent } from './create-coin-modal.component';

describe('CreateCoinModalComponent', () => {
  let component: CreateCoinModalComponent;
  let fixture: ComponentFixture<CreateCoinModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCoinModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCoinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
