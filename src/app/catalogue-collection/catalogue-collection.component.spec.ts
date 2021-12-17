import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueCollectionComponent } from './catalogue-collection.component';

describe('CatalogueCollectionComponent', () => {
  let component: CatalogueCollectionComponent;
  let fixture: ComponentFixture<CatalogueCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
