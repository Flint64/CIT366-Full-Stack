import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) { 
    this.documents = [];
    this.maxDocumentId = this.getMaxId();
  }


  // https://fir-e1179.firebaseio.com/documents.json
  // 'http://localhost:3000/documents'
  getDocuments() {
    this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents').subscribe(
      // success function
    (response) => {
      this.documents = response.documents;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.documentListChangedEvent.next(this.documents.slice());
      }
    ),
      (error: any) => {
        console.log(error);
      } 
  }

  // storeDocuments(){
  //   const documents = this.documents;
  //   const documentsJSON = JSON.stringify(documents);
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //     })
  //   };
  //   this.http.put('https://fir-e1179.firebaseio.com/documents.json', documentsJSON, httpOptions).subscribe(response => {
  //     console.log(response);
  //     this.documentListChangedEvent.next(documents.slice());
  //   });
  // }

  getDocument(id: string){
    for (let document of this.documents){
      if (document.id === id){
        return document;
      }
    }
  }

  deleteDocument(document: Document){
    if (document === null){
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(() => {
        this.getDocuments();
      });

    // const pos = this.documents.indexOf(document);
    // if (pos < 0){
    //   return;
    // }

    // this.documents.splice(pos, 1);
    // const documentsListClone = this.documents.slice();
    // // this.documentListChangedEvent.next(documentsListClone);
    // // this.documentListChangedEvent.next(this.documents.slice());
    // this.storeDocuments();
  }

  getMaxId(): number {

    let maxId = 0;

      this.documents.forEach( e => {

      let currentId = +e.id;
        if (currentId > maxId){
          maxId = currentId;
        }
    });

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null) {
        return;
      }
  
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
  
        newDocument.id = '';
        const strDocument = JSON.stringify(newDocument);
  
        this.http.post<{ message: string, documents: Document[] }>('http://localhost:3000/documents', strDocument, {headers: headers})
          .subscribe(() => {
            this.getDocuments();
          })
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || newDocument === null){
      return;
    }

      const pos = this.documents.indexOf(originalDocument);
      if (pos < 0){
        return;
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      const strDocument = JSON.stringify(newDocument);

      this.http.put('http://localhost:3000/documents/' + originalDocument.id, strDocument, {headers: headers})
        .subscribe(() => {
          this.getDocuments();
        })
  }
}
