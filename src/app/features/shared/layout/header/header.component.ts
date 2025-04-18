import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/app.reducer';
import { clearAuth } from '../../../../core/app.action';

@Component({
  selector: 'app-header',
  standalone: false, 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isDropdownOpen = false;

  constructor(private router: Router, private store: Store<AppState>) {}

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!event.target.closest('.relative')) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.store.dispatch(clearAuth())
    this.router.navigate(['/login']);
    this.isDropdownOpen = false;
  }
}
