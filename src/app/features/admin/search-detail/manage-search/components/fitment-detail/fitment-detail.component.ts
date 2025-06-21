import { Component, Input } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'app-fitment-detail',
  standalone: false,
  templateUrl: './fitment-detail.component.html',
  styleUrl: './fitment-detail.component.scss'
})
export class FitmentDetailComponent {
  @Input() searchListDta: any
  @Input() isLoading: boolean = false;
  selectedTabIndex = 0;
  public columns!: any;
  userDetails: any
  fitmentDetails: any
  searchKeyword: string = '';

  constructor(
    private commonService: CommonService,
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
  }

  setInitialValue() {
    this.columns = [
      { key: 'Customer Name', title: 'Customer Name' },
      { key: 'Seller Name', title: 'Seller Name' },
      { key: 'Vehicle Number	', title: 'Vehicle Number	' },
      { key: 'RTO Code', title: 'RTO Code' },
      { key: 'Tracking Created On', title: 'Tracking Created On' },
      { key: 'Fitment Certificate', title: 'Fitment Certificate' },
    ]
  }
}
