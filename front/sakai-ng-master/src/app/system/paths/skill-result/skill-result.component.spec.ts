import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillResultComponent } from './skill-result.component';

describe('SkillResultComponent', () => {
  let component: SkillResultComponent;
  let fixture: ComponentFixture<SkillResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
