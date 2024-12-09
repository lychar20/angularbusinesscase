import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { filter, map, Observable } from 'rxjs';

const NO_NAVBAR_URLS = ['login'];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router)

  isVisible$: Observable<boolean> 
  token$: Observable<string | undefined> 
  
  ngOnInit() {
    this.isVisible$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd ),
      map((event: NavigationEnd) => !NO_NAVBAR_URLS.some(url => event.url.includes(url)))
    )
    this.token$ = this.authService.token$
/*     this.router.events.subscribe(event => {
      this.isVisible = !(event instanceof NavigationEnd && NO_NAVBAR_URLS.some(url => event.url.includes(url)))
    }) */
  }

  onClikLogOut(): void {
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }

}
