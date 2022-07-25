import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePathsComponent } from './browse-paths.component';

describe('BrowsePathsComponent', () => {
  let component: BrowsePathsComponent;
  let fixture: ComponentFixture<BrowsePathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowsePathsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
