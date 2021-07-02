import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {

  @Input() namepage:string ='';
  @Input() id:number =0;
  @Input() iconheader : string='fas fa-archive';
  dia: string ;
  constructor() {
    this.dia = moment().format('MMMM Do YYYY, h:mm:ss a');
   }

  ngOnInit(): void {
  }

}
