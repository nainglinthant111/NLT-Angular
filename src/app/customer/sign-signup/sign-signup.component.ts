import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-sign-signup',
  standalone: true,
  imports: [CommonModule, RouterLink,HttpClientModule,FormsModule,ReactiveFormsModule],
  templateUrl: './sign-signup.component.html',
  styleUrl: './sign-signup.component.css'
})
export class SignSignupComponent {
  regForm: boolean = false;
  loginForm:boolean=false;
  signUpForm!: FormGroup;
  signInForm!: FormGroup;
  signUpsubmitted = false;
  href: string = '';
  user_data: any;
  user_dto!: User;
  user_reg_data: any;
  signInFormValue: any = {};
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginSignupService) {

  }
  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href == '/sign-up') {
      this.regForm = true;
      this.loginForm=false;
    } else if (this.href == '/sign-in') {
      this.regForm = false;
      this.loginForm=true;
    }
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  get rf() {
    return this.signUpForm.controls;
  }
  onSubmitSignUp() {
    this.signUpsubmitted = true;
    this.user_reg_data = this.signUpForm.value;
    this.user_dto = {
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.ciry,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role
    }
    this.loginService.userRegister(this.user_dto).subscribe(data=>{
      alert("User Register Successfull!");
      this.router.navigateByUrl('/sign-in');
    });
  }
  onSubmitSignIn() {
    console.log("Form values:", this.signInFormValue); // Check form values
    
    this.loginService.authLogin(this.signInFormValue.email, this.signInFormValue.password)
      .subscribe(
        (data: string | any[]) => {
          console.log("Response data:", data); // Check response data
          
          if (data.length === 1) {
            const user = data[0];
            sessionStorage.setItem("user_session_id", user.id);
            sessionStorage.setItem("role", user.role);
            
            if (user.role === "seller" || user.role === "buyer") {
              this.router.navigateByUrl('/seller-dashboard'); // Navigate to appropriate dashboard
            } else {
              alert("Invalid role!");
            }
          } else {
            alert("Invalid login details!");
          }
        },
        (error: any) => {
          console.error("Error:", error); // Log any errors
        }
      );
  }
  
}
