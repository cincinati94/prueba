import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  @Input() itemsPerPage: number = 0;
  @Input() totalItems: number = 0;
  numPages: number = 0;
  currentPage: number = 1;

  @Output() pageChange = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems'] || changes['itemsPerPage']) {
      this.currentPage = 1;
      this.getTotalPages();
      this.emitPageChange();
    }
  }

  nextPage() {
    if (this.currentPage < this.numPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  getTotalPages() {
    this.numPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pageChange.emit();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.numPages) {
      this.currentPage = page;
      this.emitPageChange();
    }
  }

  emitPageChange() {
    this.currentPage = 1;
    this.pageChange.emit(this.currentPage);
  }
}
