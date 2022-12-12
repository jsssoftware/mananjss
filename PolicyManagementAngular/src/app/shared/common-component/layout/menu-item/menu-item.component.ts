import { Component, OnInit , Input,  ViewChild} from '@angular/core';
import { IMenuItemDto } from 'src/app/app-entites/dtos/common/menuitem-dto';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  @Input() items: IMenuItemDto[]=[]; 
  @ViewChild('childMenu', {static: true}) public childMenu: any;
  constructor() { }  
}
