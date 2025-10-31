import { Component } from '@angular/core';
import { GithubService } from '../services/github.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GithubUser } from '../../models/github-user.model';
import { List } from '../list/list';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, List, CommonModule],
  providers: [GithubService],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });
  user: GithubUser[] = [];
  inputName: string = '';

  private dataSubscription?: Subscription;

  constructor(private github: GithubService) {}

  ngOnInit() {}

  onSubmitForm() {
    this.dataSubscription?.unsubscribe();
    this.inputName = this.searchForm.value.username;
    if (!this.inputName) return;
    this.user = [];

    this.github.getListDataUser(this.inputName).subscribe({
      next: (data) => (this.user = [data]),
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
  }
}
