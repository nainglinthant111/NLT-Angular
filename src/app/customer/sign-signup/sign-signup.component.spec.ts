import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignSignupComponent } from './sign-signup.component';

describe('SignSignupComponent', () => {
  let component: SignSignupComponent;
  let fixture: ComponentFixture<SignSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
