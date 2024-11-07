import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HomeRoutingModule } from './public-routing.module';
  import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
  
  
  @NgModule({
    declarations: [
  ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      
    ]
  })
  export class PublicModule { }
  