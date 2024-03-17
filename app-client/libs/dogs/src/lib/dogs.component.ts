import { Component, OnInit } from '@angular/core';
import { Dog } from 'output/models/dog';
import { APIClient } from 'output';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Owner } from 'output/models/owner';

@Component({
  selector: 'ad-dogs',
  templateUrl: './dogs.component.html',
})
export class DogsComponent implements OnInit {
  dogs: Dog[] = [];
  owners: Owner[] = [];

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    breed: new FormControl('', [Validators.required]),
    ownerid: new FormControl('', [Validators.required]),
  });

  submitted = false;
  somethingWentWrong = false;

  observableDogList: BehaviorSubject<Dog[]> = new BehaviorSubject<Dog[]>([]);

  get observableList(): Observable<Dog[]> {
    return this.observableDogList.asObservable();
  }

  constructor(private api: APIClient) {}

  ngOnInit(): void {
    this.api.getDog().subscribe((dogs) => {
      this.dogs = dogs;
      this.observableDogList.next(this.dogs);
    });

    this.api.getOwner().subscribe((owners) => {
      this.owners = owners;
    });
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm?.valid) {
      const dog = JSON.stringify(this.profileForm.value);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const selfThis = this;
      selfThis.api.postDog(dog, { headers: headers }).subscribe({
        next() {
          const ownerName = selfThis.owners.find(
            (x) => x.ownerId == selfThis.profileForm.controls['ownerid'].value
          )?.name;
          const dogObject: Dog = JSON.parse(dog);
          if (ownerName) {
            dogObject.owner = {
              ownerId: selfThis.profileForm.controls['ownerid'].value,
              name: ownerName,
            };
          }
          selfThis.dogs.push(dogObject);
          selfThis.observableDogList.next(selfThis.dogs);
          selfThis.profileForm.controls['name'].setValue('');
          selfThis.profileForm.controls['breed'].setValue('');
          selfThis.profileForm.controls['ownerid'].setValue('');
          selfThis.somethingWentWrong = false;
        },
        error() {
          selfThis.somethingWentWrong = true;
        },
      });
    }
  }
}
