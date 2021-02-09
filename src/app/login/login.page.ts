import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, AUTH_SERVICE } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(AUTH_SERVICE) private authService: AuthService) { }

  ngOnInit(): void { }

  async ionViewWillEnter() {
    if (this.route.snapshot.queryParamMap.get('signOut')) {
      await this.authService.signOut();
      // hack to get rid of ?signOut=true which if left will cause 
      // firebaseui to use as a redirect on subsequent login
      this.router.navigateByUrl('/login');  
    }

    console.log(`this.firebaseUi.start()`);
    await this.authService.firebaseUi.start('#firebaseui-auth-container', this.authService.getUiConfig());
  }
}
