import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionNavComponent } from './collection-nav.component';

describe('CollectionNavComponent', () => {
  let component: CollectionNavComponent;
  let fixture: ComponentFixture<CollectionNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
