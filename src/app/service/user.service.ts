import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore:AngularFirestore,private afAuth: AngularFireAuth) { }

  newUserRegister(newUser:any): Observable<any> {

    return new Observable(observer => {
      this.afAuth.createUserWithEmailAndPassword(
        newUser.email, newUser.password
      ).then((userCredential) => {
        const user = userCredential.user;
        newUser.uid = user?.uid;

        this.firestore.collection('users').doc(newUser.uid).set(newUser)
          .then(() => {
            observer.next(newUser);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      }).catch((error) => {
        observer.error(error);
      });
    })
  }

  userLogin(email:any, password:any):Promise<any>{
    return new Promise<any>((resolve, reject) =>{
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((userCredential ) =>{
          const user = userCredential.user;
          resolve(user);
        }).catch(error => {
          reject(error);
      });
    })
  }
}


