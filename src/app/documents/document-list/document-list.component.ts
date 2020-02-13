import { Component, OnInit} from '@angular/core';
import { Document } from '../documents.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];

  // onSelectedDocument(document: Document){
    // this.documentsService.documentSelectedEvent.emit(document);
  // }

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documents = this.documentsService.getDocuments();
    this.documentsService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
  }
 
}
