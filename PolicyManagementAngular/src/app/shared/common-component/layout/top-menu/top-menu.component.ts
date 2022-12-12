import { Component, OnInit } from '@angular/core';
import { getMatIconNameNotFoundError } from '@angular/material/icon';
import { IMenuItemDto } from 'src/app/app-entites/dtos/common/menuitem-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css','./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  public responseMenus : IMenuItemDto[]=[];
  constructor(
    private commonService: ICommonService, 
  ) { }

  ngOnInit(): void {
    this.getMenu()
  }
  getMenu() {
    this.commonService.getMenus().subscribe((response: IMenuItemDto[]) => {
      this.responseMenus = response; 
    });
  } 
}
