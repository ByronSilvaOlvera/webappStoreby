import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CategoryElement } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { FunctionCategory } from '../function-category';

@Component({
  selector: 'app-grid-category',
  templateUrl: './grid-category.component.html',
  styleUrls: ['./grid-category.component.scss']
})
export class GridCategoryComponent implements OnInit, OnDestroy {
  
  categories : CategoryElement[] = [];
  subscription: Subscription;

  constructor(private _srvcategory : CategoryService
    ,private spinner: NgxSpinnerService) { 
      this.spinner.show();
      this.subscription = this._srvcategory.getList().subscribe(
        data => {
          this.categories = data.list!;
          this.spinner.hide();
        }
      )
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }




  /** DETAIL */
  onDetail(id : number){
    
    var ent = this.categories.filter(x => x.id === id )[0];
    
    this._srvcategory.addIdDetail(
      { id: id , 
        colortitle: 'text-info' , 
        estado:true , 
        data: ent
      });

      // to go panel Detail
      new FunctionCategory().onSelectTab('pills-detail-tab');
  }
  
  /** DELETE */
  onDelete(id : number){


    var ent = this.categories.filter(x => x.id === id )[0];

    this._srvcategory.addIdDetail(
      { 
        id: id , 
        colortitle: 'text-dange', 
        estado:false,
        data:ent
      });

      new FunctionCategory().onSelectTab('pills-delete-tab');
  }

  /** UPDATE */
  onUpdate(id: number){    
    new FunctionCategory().onSelectTab('pills-contact-tab');
    var ent = this.categories.filter(x => x.id === id )[0];
    this._srvcategory.addForm(
      {
        id:id,
        estado:false,
        colortitle:'text-info', 
        data:ent
      });
  }

  oncreate(){
    this._srvcategory.addFormCreate();
  }
 

}
