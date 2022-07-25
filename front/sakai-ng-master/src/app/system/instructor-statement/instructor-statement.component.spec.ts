import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorStatementComponent } from './instructor-statement.component';

describe('InstructorStatementComponent', () => {
  let component: InstructorStatementComponent;
  let fixture: ComponentFixture<InstructorStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
