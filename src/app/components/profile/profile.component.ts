import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user: any={};

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchProfile();
  }
  fetchProfile() {
    this.authService.profile().subscribe((response:any)=>{
      this.user = response.data;
      console.log(this.user)
    })
  }
}
