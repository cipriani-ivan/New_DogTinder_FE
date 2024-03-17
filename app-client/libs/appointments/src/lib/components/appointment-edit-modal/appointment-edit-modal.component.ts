import { Component, Inject, OnInit } from '@angular/core';
import { Appointment } from 'output/models/appointment';
import { APIClient } from 'output';
import { Dog } from 'output/models/dog';
import { Owner } from 'output/models/owner';
import { Place } from 'output/models/place';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'ad-appointment-edit-modal',
  templateUrl: './appointment-edit-modal.component.html',
})
export class AppointmentEditModalComponent implements OnInit {
  appointments: Appointment[] = [];
  dogs: Dog[] = [];
  owners: Owner[] = [];
  places: Place[] = [];

  profileForm = new FormGroup({
    appointmentid: new FormControl('', [Validators.required]),
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

  data: any;

  constructor(
    private api: APIClient,
    private dialogRef: MatDialogRef<AppointmentEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private readonly router: Router
  ) {
    this.data = data;
  }

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

    this.profileForm.controls['appointmentid'].setValue(
      this.data.appointmentId
    );
    this.profileForm.controls['dogid'].setValue(this.data.dogId);
    this.profileForm.controls['placeid'].setValue(this.data.placeId);
    this.profileForm.controls['time'].setValue(this.data.time as string);
  }

  async onSubmit(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const selfThis = this;
    if (this.profileForm?.valid) {
      const appointment = JSON.stringify(this.profileForm.value);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.api.patchAppointment(appointment, { headers: headers }).subscribe({
        next() {
          selfThis.dialogRef.close();
          window.location.reload();
        },
        error() {
          selfThis.somethingWentWrong = true;
        },
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
