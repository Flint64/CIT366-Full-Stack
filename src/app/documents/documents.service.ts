import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  
  documentChangedEvent = new EventEmitter<Document[]>();

  documents: Document[];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
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
    this.documentChangedEvent.emit(this.documents.slice());

  }
}
