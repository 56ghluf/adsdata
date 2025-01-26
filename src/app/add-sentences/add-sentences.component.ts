import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, CollectionReference, DocumentReference } from '@angular/fire/firestore';


@Component({
  selector: 'app-add-sentences',
  imports: [AsyncPipe],
  templateUrl: './add-sentences.component.html',
  styleUrl: './add-sentences.component.css'
})

export class AddSentencesComponent {
  firestore = inject(Firestore);
  statements: Observable<any[]>;
  pvnCollection: CollectionReference;

  constructor() {
    this.pvnCollection = collection(this.firestore, 'PosVsNorm');
    this.statements = collectionData(this.pvnCollection);
  }

  onSubmit(event: any) {
    event.preventDefault();
    addDoc(this.pvnCollection, <Statement> { sentence: event.target.query.value }).then(
      (documentReference: DocumentReference) => {
        console.log(documentReference);
      }
    )
    event.target.query.value = "";
  }
}

export interface Statement {
  sentence: string;
}