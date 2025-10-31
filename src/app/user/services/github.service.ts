import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubRepo, GithubUser } from '../../models/github-user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private urlBase = 'https://api.github.com/users/';
  token = environment.githubToken; 

  headers = new HttpHeaders({
      Authorization: `token ${this.token}`,
    });

  constructor(private httpClient:HttpClient){}
    getListDataUser(name:String):Observable<GithubUser>{
      this.headers
      return this.httpClient.get<GithubUser>(`${this.urlBase}${name}`);
    }
    getListReposUser(name:String):Observable<GithubRepo[]>{
      this.headers
      return this.httpClient.get<GithubRepo[]>(`${this.urlBase}${name}/repos`);
    }
      
}
