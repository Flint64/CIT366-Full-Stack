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

  getDocuments() {
    this.http.get('https://fir-e1179.firebaseio.com/documents.json').subscribe(
      // success function
    (documents: Document[] ) => {
      this.documents = documents
      this.maxDocumentId = this.getMaxId()
      this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.documentListChangedEvent.next(documents.slice());
      }
    ),
      (error: any) => {
        console.log(error);
      } 
  }

  storeDocuments(){
    const documents = this.documents;
    const documentsJSON = JSON.stringify(documents);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    this.http.put('https://fir-e1179.firebaseio.com/documents.json', documentsJSON, httpOptions).subscribe(response => {
      console.log(response);
      this.documentListChangedEvent.next(documents.slice());
    });
  }

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

    const pos = this.documents.indexOf(document);
    if (pos < 0){
      return;
    }

    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }

  getMaxId(): number {

    let maxId = 0;

    this.documents.forEach(e => {

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
    } else {
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId.toString();
      this.documents.push(newDocument);
      let documentsListClone = this.documents.slice();
      // this.documentListChangedEvent.next(documentsListClone);
      this.storeDocuments();
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || newDocument === null){
      return;
    }

      const pos = this.documents.indexOf(originalDocument);
      if (pos < 0){
        return;
      }
      
        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument;

        // let documentsListClone = this.documents.slice();
        this.storeDocuments();
  }

}
