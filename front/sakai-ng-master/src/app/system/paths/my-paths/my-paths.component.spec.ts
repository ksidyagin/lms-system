import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPathsComponent } from './my-paths.component';

describe('MyPathsComponent', () => {
  let component: MyPathsComponent;
  let fixture: ComponentFixture<MyPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPathsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
