import {Component} from '@angular/core';
import {PetsService} from './shared/components/pets.service';
import {Observable} from 'rxjs';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
 
  public pets;
  dataLoaded: Promise<boolean>;
  
  ngOnInit() {
    this.getPets();
  }
 
  constructor(private _petsService: PetsService) { }
  
  getPets() {
   this._petsService.getOwnersWithPets().subscribe(
      data => { 
        this.pets = data;
        this.pets=this._petsService.flattenData(this.pets);
        this.pets=this._petsService.sortData(this.pets,'petName');
        this.pets=this._petsService.groupData(this.pets,'ownerGender');
        this.dataLoaded = Promise.resolve(true);
      },
      err => console.error(err),
      () => console.log('done loading owners')
    );
  }
  
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
  }
}

