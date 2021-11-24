import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { Comp1Component } from './components/comp1/comp1.component';
import { FooterComponent } from './layout/footer/footer.component';
import { Comp2Component } from './components/comp2/comp2.component';
import { Comp3Component } from './components/comp3/comp3.component';


@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        Comp1Component,
        FooterComponent,
        Comp2Component,
        Comp3Component
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
