import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }
  handleLogout() {
    this.authService.logout().subscribe({
      next: (result) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toastr.error(error);
      }
    });
  }
}
