import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RoutesModule } from './routes/routes.module';

import { AppComponent } from './app.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

import { NameFilterPipe } from './name-filter.pipe';
import { CategoryFilterPipe } from './category-filter.pipe';
import { PriceFilterPipe } from './price-filter.pipe';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from '../interceptors/HttpErrorInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    AdminViewComponent,
    NameFilterPipe,
    CategoryFilterPipe,
    PriceFilterPipe,
  ],
  imports: [
    RoutesModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
