import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {

  @Input() HeadArray :any[] = [];
  @Input() GridArray :any[] = []; 
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  getNestedValue(item: any, fieldName: string): any {
    if (!fieldName) return '';
    return fieldName.split('.').reduce((obj, key) => obj && obj[key], item);
  }
  edit(item: any) {
    this.onEdit.emit(item);
  }
  delete(item: any) {
    this.onDelete.emit(item);
  }
}
