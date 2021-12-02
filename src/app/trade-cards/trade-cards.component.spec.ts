import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCardsComponent } from './trade-cards.component';

describe('TradeCardsComponent', () => {
  let component: TradeCardsComponent;
  let fixture: ComponentFixture<TradeCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
