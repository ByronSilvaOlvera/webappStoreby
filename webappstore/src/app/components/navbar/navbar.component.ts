import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewUxService } from '../../services/view-ux.service';
import { Menu } from '../../interfaces/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _srvMenu: ViewUxService) { }

  menus:Menu[] =[ 
    {
      icon : 'fas fa-gem',
      title : 'STORE',
      link : '/'
    },
    {
      icon : 'fas fa-store-alt',
      title : 'Store',
      link : '/store',
    },
    {
      icon : 'fas fa-shopping-cart',
      title : 'Category',
      link : '/category',
    },
    {
      icon : 'fas fa-archive',
      title : 'Product',
      link : '/product',
    },
  ]


  ngOnInit(): void {
  }

  chooseMenu(menu: Menu){
    this._srvMenu.addMenuChoose(menu);
  }

}
