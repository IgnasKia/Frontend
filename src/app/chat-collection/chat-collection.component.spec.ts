import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCollectionComponent } from './chat-collection.component';

describe('ChatCollectionComponent', () => {
  let component: ChatCollectionComponent;
  let fixture: ComponentFixture<ChatCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
