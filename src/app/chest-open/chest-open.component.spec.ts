import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChestOpenComponent } from './chest-open.component';

describe('ChestOpenComponent', () => {
  let component: ChestOpenComponent;
  let fixture: ComponentFixture<ChestOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChestOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChestOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
