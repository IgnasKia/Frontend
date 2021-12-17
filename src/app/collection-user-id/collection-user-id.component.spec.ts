import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionUserIdComponent } from './collection-user-id.component';

describe('CollectionUserIdComponent', () => {
  let component: CollectionUserIdComponent;
  let fixture: ComponentFixture<CollectionUserIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionUserIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
