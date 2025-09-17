import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-manufacture-more-detail',
  standalone: false,
  templateUrl: './manufacture-more-detail.component.html',
  styleUrl: './manufacture-more-detail.component.scss'
})
export class ManufactureMoreDetailComponent {
  moreDetaildata: any
  tittle: string = 'Detail';
  public columns!: any;

  constructor(
    private bsModalService: BsModalService,
  ) { }

  ngOnInit() {
    console.log('moreDetaildata', this.moreDetaildata);
    this.setInitialValue()
  }

    setInitialValue() {
    this.columns = [
      { key: 'Status', title: 'Status' },
      { key: 'Password', title: 'Password' },
      { key: 'State', title: 'State' },
      { key: 'City', title: 'City' },
      { key: 'Address', title: 'Address' },
    ]
  }

  cancel() {
    this.bsModalService.hide();
  }
}
