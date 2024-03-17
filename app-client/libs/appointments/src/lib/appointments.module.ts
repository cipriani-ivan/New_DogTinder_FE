import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentEditModalComponent } from './components/appointment-edit-modal/appointment-edit-modal.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
  declarations: [AppointmentsComponent, AppointmentEditModalComponent],
})
export class AppointmentsModule {}
