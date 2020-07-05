import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() button = '';
  @Input() count  = 0;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router ) {

  }

  ngOnInit(): void {}
    public onLogout = () =>{
      this.authenticationService.logout();
      this.router.navigateByUrl('/login');
  }
}
