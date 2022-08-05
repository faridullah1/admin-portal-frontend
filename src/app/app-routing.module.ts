import { LoginComponent } from './components/login/login.component';
import { UserQueriesComponent } from './components/user-queries/user-queries.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { CoursesComponent } from './components/courses/course.component';
import { StudentsComponent } from './components/students/students.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { RecentAnnouncementsComponent } from './components/announcements/announcements.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: AllEmployeesComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SystemSettingsComponent, canActivate: [AuthGuard] },
  { path: 'announcements', component: RecentAnnouncementsComponent, canActivate: [AuthGuard] },
  { path: 'queries', component: UserQueriesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: 'students', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
