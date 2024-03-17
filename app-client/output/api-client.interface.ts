/* tslint:disable */

import { Observable } from 'rxjs';
import { HttpOptions } from './';
import { Appointment } from './models/appointment';
import { Dog } from './models/dog';
import { Place } from './models/place';
import { Owner } from './models/owner';

export interface APIClientInterface {
  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getAppointment(requestHttpOptions?: HttpOptions): Observable<Appointment[]>;

  /**
   * Response generated for [ 201 ] HTTP response code.
   */
  postAppointment(
    appointment: string,
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 204 ] HTTP response code.
   */
  patchAppointment(
    appointment: string,
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  deleteAppointment(
    appointment: number,
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getDog(requestHttpOptions?: HttpOptions): Observable<Dog[]>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  postDog(dog: string, requestHttpOptions?: HttpOptions): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getOwner(requestHttpOptions?: HttpOptions): Observable<Owner[]>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  postOwner(owner: string, requestHttpOptions?: HttpOptions): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getPlace(requestHttpOptions?: HttpOptions): Observable<Place[]>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  postPlace(place: string, requestHttpOptions?: HttpOptions): Observable<void>;
}
