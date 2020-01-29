import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents = [
    new Document(1, "Document 1", " You've found document 1!", " www.google.com", "null"),
    new Document(2, "Document 2", " Document 2 reporting in", " www.google.com", "null"),
    new Document(3, "Document 3", " Document 3, ready for duty", " www.google.com", "null"),
    new Document(4, "Document 4", " Ready for document 4?", " www.google.com", "null")
  ];

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

  constructor() { }

  ngOnInit() {
  }

}
