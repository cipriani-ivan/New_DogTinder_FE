import { Component, OnInit } from '@angular/core';
import { Owner } from 'output/models/owner';
import { APIClient } from 'output';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'ad-owners',
  templateUrl: './owners.component.html',
})
export class OwnersComponent implements OnInit {
  owners: Owner[] = [];

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  submitted = false;

  somethingWentWrong = false;

  observableOwnerList: BehaviorSubject<Owner[]> = new BehaviorSubject<Owner[]>(
    []
  );

  get observableList(): Observable<Owner[]> {
    return this.observableOwnerList.asObservable();
  }

  constructor(private api: APIClient) {}

  ngOnInit(): void {
    this.api.getOwner().subscribe((owners) => {
      this.owners = owners;
      this.observableOwnerList.next(this.owners);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm?.valid) {
      const owner = JSON.stringify(this.profileForm.value);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const selfThis = this;
      selfThis.api.postOwner(owner, { headers: headers }).subscribe({
        next() {
          selfThis.owners.push(JSON.parse(owner));
          selfThis.observableOwnerList.next(selfThis.owners);
          selfThis.profileForm.controls['name'].setValue('');
          selfThis.somethingWentWrong = false;
        },
        error() {
          selfThis.somethingWentWrong = true;
        },
      });
    }
  }
}
