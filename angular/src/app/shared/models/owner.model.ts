import {Pet} from "./pet.model";

export class Owner {
  name: string;
  gender: string;
  age: number;
  pets: Pet[] = [];
}