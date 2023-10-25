import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostypeComponent } from './postype.component';

describe('PostypeComponent', () => {
  let component: PostypeComponent;
  let fixture: ComponentFixture<PostypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
