import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [NavMenuComponent],
  declarations: [NavMenuComponent],
})
export class NavMenuModule {
  static forRoot(): ModuleWithProviders<NavMenuModule> {
    return { ngModule: NavMenuModule };
  }
}
