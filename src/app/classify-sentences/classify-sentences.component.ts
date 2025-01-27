import { Component, inject } from '@angular/core';
import { Observable  } from 'rxjs';
import { Firestore, CollectionReference, DocumentReference, collection, collectionData, doc, setDoc, deleteDoc } from '@angular/fire/firestore';

import { Statement, StatementResult } from '../add-sentences/add-sentences.component';

@Component({
  selector: 'app-classify-sentences',
  imports: [],
  templateUrl: './classify-sentences.component.html',
  styleUrl: './classify-sentences.component.css'
})

export class ClassifySentencesComponent {
  firestore = inject(Firestore);

  statements: Observable<any[]>; 
  statementResults: Observable<any[]>;

  pvnCollection: CollectionReference;
  pvnResultsCollection: CollectionReference;

  cStatements: Statement[] = [];
  currentPos = 0;

  alreadySeen = new Set<string>();

  cStatementResults: StatementResult[] = [];

  constructor() {
    this.pvnCollection = collection(this.firestore, 'PosVsNorm');
    this.pvnResultsCollection = collection(this.firestore, 'PosVsNormResults');

    this.statements = collectionData(this.pvnCollection, { idField: 'id'});
    this.statementResults = collectionData(this.pvnResultsCollection, { idField: 'id' });
  
    this.statements.subscribe((x) => {
      this.cStatements = [];
      for (let statement of x) {
        this.cStatements.push(<Statement> statement);
      };
      for (let i = 0; i < this.cStatements.length; i++) {
        if (!this.alreadySeen.has(this.cStatements[i].sentence)) {
          this.currentPos = i;
          break;
        }
      }
    })

    this.statementResults.subscribe((x) => {
      this.cStatementResults = [];
      for (let statementResult of x) {
        this.cStatementResults.push(<StatementResult> statementResult);
      }
    })
  }

  onSubmit(positive: boolean) {
    this.currentPos = 0;
    this.alreadySeen.add(this.cStatements[this.currentPos].sentence);
    this.cStatements[this.currentPos].count -= 1

    let statementRef = doc(this.firestore, "PosVsNorm", this.cStatements[this.currentPos].id as string);

    let statementResultRef: DocumentReference;

    for (let i = 0; i < this.cStatementResults.length; i++) {
      if (this.cStatementResults[i].sentence == this.cStatements[this.currentPos].sentence) {
        statementResultRef = doc(this.firestore, "PosVsNormResults", this.cStatementResults[i].id as string);

        if (positive) { this.cStatementResults[i].positive += 1; }
        else { this.cStatementResults[i].normative += 1; }

        if (this.cStatements[this.currentPos].count <= 0) {
          deleteDoc(statementRef).then(() => {
            console.log("Deleteed doc.")
          });
        } else {
          setDoc(statementRef, this.cStatements[this.currentPos])
        }

        setDoc(statementResultRef, this.cStatementResults[i])

        break;
      }
    }
  }
}