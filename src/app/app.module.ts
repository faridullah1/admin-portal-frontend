import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { StudentsComponent } from './components/students/students.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MainLayoutComponent } from './layout/main-layout/layout.component';
import { DrawerComponent } from './layout/drawer/drawer.component';
import { HttpClientModule } from '@angular/common/http';
import { AddStudentComponent } from './components/students/add-student/add-student.component';
import { GenericPageModule } from './shared/generic-page/module';


@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        StudentsComponent,
        FooterComponent,
        TeachersComponent,
        MainLayoutComponent,
        DrawerComponent,
        AddStudentComponent
    ],
    imports: [
        BrowserModule,
		BrowserAnimationsModule,
        ReactiveFormsModule,
		HttpClientModule,
		
        AppRoutingModule,

        MaterialModule,
		GenericPageModule
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }
