import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from "../../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  returnUrl!: string;
  isSubmitted: boolean = false;
  user = new User();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  onSubmit() {
    this.isSubmitted = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (result) => {

        this.router.navigate([this.returnUrl || '/profile']);
      },
      error: (error) => {
        console.log("Hello")
        this.toastr.error(error);
      }
    })
      .add(() => {
        this.isSubmitted = false;
      });
  }
  postLogin(){
    this.authService.postLogin(this.user).subscribe((response:any)=>{
      if(response){
        this.router.navigate(['/profile']);
      }
    })
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }
}
