import { Component, OnInit } from '@angular/core';
import { Document } from '../documents.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  constructor(private documentService: DocumentsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {

      this.id = params.id;

      if (this.id === null || this.id === undefined){
        this.editMode = false;
        console.log(this.editMode);
        return;
      }

      this.originalDocument = this.documentService.getDocument(this.id);
      if (this.originalDocument === null){
        return;
      }
      this.editMode = true;
      this.document = this.originalDocument;

      console.log(this.editMode);
    })
  }

  onCancel(){
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm){

    let newDocument = new Document(this.id, form.value['name'], form.value['description'], form.value['url'], null);
    if (this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['../'], {relativeTo: this.route});

  }

}
