import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[];
  maxDocumentId: number;

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(){
    return this.documents.slice();
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
    this.documentListChangedEvent.next(documentsListClone);
    // this.documentListChangedEvent.next(this.documents.slice());
    
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
      this.documentListChangedEvent.next(documentsListClone);
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || newDocument === null){
      return;
    } else {
      const pos = this.documents.indexOf(originalDocument);
      if (pos < 0){
        return;
      } else {
        newDocument.id = originalDocument.id;
        document[pos] = newDocument;
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
      }
    }
  }

}
