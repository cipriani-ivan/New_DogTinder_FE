import { Owner } from './owner';

export interface Dog {
  dogId: number;
  name: string;
  breed: string;
  ownerId: number;
  owner: Owner;
}
