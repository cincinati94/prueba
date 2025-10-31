import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubRepo, GithubUser } from '../../models/github-user.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private urlBase = 'https://api.github.com/users/';

  constructor(private httpClient: HttpClient) {}
  getListDataUser(name: String): Observable<GithubUser> {
    return this.httpClient.get<GithubUser>(`${this.urlBase}${name}`);
  }
  getListReposUser(name: String): Observable<GithubRepo[]> {
    return this.httpClient.get<GithubRepo[]>(`${this.urlBase}${name}/repos`);
  }
}
