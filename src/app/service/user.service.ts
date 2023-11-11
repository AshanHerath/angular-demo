import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore:AngularFirestore) { }

  newUserRegister(newUser:any){
    return this.firestore.collection('users').add(newUser);
  }

  userLogin(id:any):Observable<any>{
    return this.firestore.collection('users').doc(id).valueChanges();
  }

}
