import { Component, OnInit, OnDestroy} from '@angular/core';
import { Document } from '../documents.model';
import { DocumentsService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[] = [];
  private subsciption: Subscription;

  // onSelectedDocument(document: Document){
    // this.documentsService.documentSelectedEvent.emit(document);
  // }

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documents = this.documentsService.getDocuments();
    this.subsciption = this.documentsService.documentListChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
  }

  ngOnDestroy(){
    this.subsciption.unsubscribe();
  }
 
}
