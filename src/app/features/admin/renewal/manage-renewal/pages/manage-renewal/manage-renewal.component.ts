import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-renewal',
  standalone: false,
  templateUrl: './manage-renewal.component.html',
  styleUrl: './manage-renewal.component.scss'
})
export class ManageRenewalComponent {
activeTab:any = 'upcoming'
}
