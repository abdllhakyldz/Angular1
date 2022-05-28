/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DosyalarComponent } from './dosyalar.component';

describe('DosyalarComponent', () => {
  let component: DosyalarComponent;
  let fixture: ComponentFixture<DosyalarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosyalarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DosyalarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
