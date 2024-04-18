import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHousePage } from './add-house.page';

describe('AddHousePage', () => {
  let component: AddHousePage;
  let fixture: ComponentFixture<AddHousePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddHousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
