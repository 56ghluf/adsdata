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
  pvnResultsCollection: CollectionReference;

  constructor() {
    this.pvnCollection = collection(this.firestore, 'PosVsNorm');
    this.pvnResultsCollection = collection(this.firestore, 'PosVsNormResults');
    this.statements = collectionData(this.pvnCollection);
  }

  onSubmit(event: any) {
    event.preventDefault();
    addDoc(this.pvnCollection, <Statement> { sentence: event.target.query.value, count: 3 }).then(
      (documentReference: DocumentReference) => {
        console.log(documentReference);
      }
    )

    addDoc(this.pvnResultsCollection, <StatementResult> { sentence: event.target.query.value, positive: 0, normative: 0 }).then(
      (documentReference: DocumentReference) => {
        console.log(documentReference);
      }
    )
    event.target.query.value = "";
  }
}

export interface Statement {
  sentence: string;
  count: number;
  id?: string;
}

export interface StatementResult {
  sentence: string;
  positive: number;
  normative: number;
  id?: string;
}