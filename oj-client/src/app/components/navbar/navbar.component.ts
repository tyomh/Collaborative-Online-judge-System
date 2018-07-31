import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "Online Judge System"

  username = ""

  constructor(@Inject('auth') private auth) { }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      console.log("isauthenticated");
      console.log(this.auth.userProfile);
      if (this.auth.userProfile) {
        console.log(this.auth.userProfile);
          this.username = this.auth.userProfile.username;
      } else {
          this.auth.getProfile((err, profile) => {
            this.username = profile.nickname
        });
      }
    }
  }

  login():void {
    this.auth.login()
  }

  logout(): void{
    this.auth.logout()
  }

}
