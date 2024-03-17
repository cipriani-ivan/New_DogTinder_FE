import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ad-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  constructor(private readonly router: Router) {}

  onClickNavigate(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }
}
