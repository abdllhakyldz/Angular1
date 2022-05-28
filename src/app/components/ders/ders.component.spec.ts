/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DersComponent } from './ders.component';

describe('DersComponent', () => {
  let component: DersComponent;
  let fixture: ComponentFixture<DersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
