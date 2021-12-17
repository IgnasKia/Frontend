import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRealComponent } from './game-real.component';

describe('GameRealComponent', () => {
  let component: GameRealComponent;
  let fixture: ComponentFixture<GameRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
