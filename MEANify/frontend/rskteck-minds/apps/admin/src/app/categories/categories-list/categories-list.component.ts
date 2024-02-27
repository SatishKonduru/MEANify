import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@rskteck-minds/products';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent  implements OnInit{
  categories:Category[] = []
  constructor(private _categoriresService: CategoriesService){}

  ngOnInit(): void {
    this._categoriresService.getCategories()
    .subscribe((res: any) => {
      this.categories = res
    })
    console.log("categories: ", this.categories)
  }
}
