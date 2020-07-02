import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { RoutesModule } from './routes/routes.module';

import { HttpClientModule } from '@angular/common/http';
import { NameFilterPipe } from './name-filter.pipe';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    AdminViewComponent,
    NameFilterPipe,
  ],
  imports: [
    RoutesModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
