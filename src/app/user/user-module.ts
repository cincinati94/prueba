import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing-module';
import { Search } from './search/search';
import { List } from './list/list';
import { Filters } from './filters/filters';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    Search,
    List,
    Filters
  ],
  exports: [
    Search
  ]
})
export class UserModule { }
