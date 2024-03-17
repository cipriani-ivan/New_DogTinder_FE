import { Component, Inject, OnInit, Self } from '@angular/core';
import { Appointment } from 'output/models/appointment';
import { APIClient } from 'output';
import { Dog } from 'output/models/dog';
import { Owner } from 'output/models/owner';
import { Place } from 'output/models/place';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppointmentEditModalComponent } from './components/appointment-edit-modal/appointment-edit-modal.component';

@Component({
  selector: 'ad-appointments',
  templateUrl: './appointments.component.html',
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  dogs: Dog[] = [];
  owners: Owner[] = [];
  places: Place[] = [];

  profileForm = new FormGroup({
    placeid: new FormControl('', [Validators.required]),
    dogid: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
  });

  submitted = false;

  somethingWentWrong = false;

  observableAppointmentList: BehaviorSubject<Appointment[]> =
    new BehaviorSubject<Appointment[]>([]);

  get observableList(): Observable<Appointment[]> {
    return this.observableAppointmentList.asObservable();
  }

  constructor(private api: APIClient, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.api.getAppointment().subscribe((appointments) => {
      this.appointments = appointments;
      this.observableAppointmentList.next(this.appointments);
    });

    this.api.getDog().subscribe((dogs) => {
      this.dogs = dogs;
    });

    this.api.getPlace().subscribe((places) => {
      this.places = places;
    });
  }

  async onSubmit(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const selfThis = this;
    if (this.profileForm?.valid) {
      const appointment = JSON.stringify(this.profileForm.value);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.api.postAppointment(appointment, { headers: headers }).subscribe({
        next() {
          window.location.reload();
        },
        error() {
          selfThis.somethingWentWrong = true;
        },
      });
    }
  }

  onClickOpenModal(
    appointmentId: number,
    dogId: number,
    placeId: number,
    time: Date
  ): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      appointmentId: appointmentId,
      dogId: dogId,
      placeId: placeId,
      time: time,
    };

    const dialogRef = this.matDialog.open(
      AppointmentEditModalComponent,
      dialogConfig
    );

    dialogRef
      .afterClosed()
      .subscribe((val: any) => console.log('Dialog output:', val));
  }

  async onClickDelete(appointmentId: number): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const selfThis = this;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.api.deleteAppointment(appointmentId, { headers: headers }).subscribe({
      next() {
        window.location.reload();
      },
      error() {
        selfThis.somethingWentWrong = true;
      },
    });
  }
}
