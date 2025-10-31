import { Component, Input, SimpleChanges } from '@angular/core';
import { GithubRepo } from '../../models/github-user.model';
import { GithubService } from '../services/github.service';
import { CommonModule } from '@angular/common';
import { Filters } from '../filters/filters';

import { Paginator } from '../../components/shared/paginator/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [CommonModule, Filters, Paginator],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  @Input() user: string = '';
  filters: any = {};
  languages: string[] = [];
  repos: GithubRepo[] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number = 0;
  filteredRepos: GithubRepo[] = [];
  paginatedRepos: GithubRepo[] = [];
  isSearching: boolean = false;
  textError: string = '';

  private dataSubscription?: Subscription;

  constructor(private github: GithubService) {}

  getRepos() {
    this.dataSubscription?.unsubscribe();

    if (this.user) {
      this.dataSubscription = this.github.getListReposUser(this.user).subscribe({
        next: (data) => {
          this.repos = data;
          this.totalItems = this.repos.length;
          this.isSearching = true;
          this.languages = Array.from(
            new Set(
              this.repos
                .map((repo) => repo.language)
                .filter((lang): lang is string => lang !== null)
            )
          );
          this.applyFilters();
        },
        error: (err) => {
          if (err.status === 404) {
            this.textError = 'Lo sentimos ese usuario no existe';
            this.repos = [];
          }
        },
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue) {
      this.getRepos();
    }
  }

  applyFilters() {
    let filtered = [...this.repos];

    if (this.filters.namerepo) {
      filtered = filtered.filter((repo) =>
        repo.name.toLowerCase().includes(this.filters.namerepo.toLowerCase())
      );
    }

    if (this.filters.languages?.length) {
      filtered = filtered.filter((repo) => this.filters.languages.includes(repo.language ?? ''));
    }

    if (this.filters.sortBy) {
      filtered.sort((a, b) =>
        this.filters.sortBy === 'asc'
          ? a.stargazers_count - b.stargazers_count
          : b.stargazers_count - a.stargazers_count
      );
    }

    if (this.filters.order) {
      this.filters.order === 'desc' ? filtered.reverse() : filtered.sort();
    }

    this.filteredRepos = filtered;
    this.updatePage();
  }

  onFiltersChanged(filters: any) {
    this.filters = filters;
    this.applyFilters();
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.totalItems = this.filteredRepos.length;
    this.paginatedRepos = this.filteredRepos.slice(start, end);
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.updatePage();
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
  }
}
