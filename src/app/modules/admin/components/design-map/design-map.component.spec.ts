import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignMapComponent } from './design-map.component';

describe('DesignMapComponent', () => {
  let component: DesignMapComponent;
  let fixture: ComponentFixture<DesignMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
