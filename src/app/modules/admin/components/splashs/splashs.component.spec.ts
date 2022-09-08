import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashsComponent } from './splashs.component';

describe('SplashsComponent', () => {
  let component: SplashsComponent;
  let fixture: ComponentFixture<SplashsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplashsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
