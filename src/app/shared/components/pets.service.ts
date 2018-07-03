import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, throwError,forkJoin } from 'rxjs';
import { map, catchError, retry, mergeMap } from 'rxjs/operators';
import * as _ from "lodash";
import { Owner } from '../models/owner.model'
import { Pet } from '../models/pet.model'
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class PetsService {
 
    pets=[];
    
    constructor(private http:HttpClient) {}
    
    getOwnersWithPets():Observable<Owner[]> {
        return this.http
          .get('http://agl-developer-test.azurewebsites.net/people.json').pipe(
            map(owners => {
              return owners.map(owner => {
                        var own= new Owner(); 
                        own.name=owner.name;
                        own.gender=owner.gender;
                        own.age=owner.age;
                        if(owner.pets != null)
                        {
                          own.pets=owner.pets.map(pet => {
                            var pt= new Pet(); 
                            pt.name=pet.name;
                            pt.type=pet.type;
                            return pt;
                            });
                        }
                        return own;
                      }
                    )
                  }
                )
              )
    }
    
    flattenData(data) {
      if (data=='' || data==null) {
        throw new TypeError("Data must be passed to flatten function!");
      }
      var pets=[]
      data.forEach( owner => {
             owner.pets.forEach( pet => {
                pets.push( {ownerGender:owner.gender,petName:pet.name});
             });
      });
      return pets;
    }
    
    sortData(pets,parameter) {
      if (pets=='' || pets==null) {
        throw new TypeError("Pets array must be passed to sort function!");
      }
      if (parameter==null) {
        throw new TypeError("Sort parameter must be passed to sort function!");
      }
      return _.sortBy(pets,function (pet) { return pet[parameter]; })
    }
    
    groupData(pets,parameter) {
      if (pets=='' || pets==null) {
        throw new TypeError("Pets array must be must be passed to group function!");
      }
      if (parameter==null) {
        throw new TypeError("Group parameter must be passed to group function!");
      }
      return _.groupBy(pets, function (pet) { return pet[parameter]; })
    }
}