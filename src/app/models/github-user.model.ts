export interface GithubUser {
  avatar_url: string;
  repos_url: string;
  name: string;
  bio: string;
}

export interface GithubRepo {
  name: string;
  description: string;
  url: string;
  html_url:string;
  stargazers_count: number;
  language: string;
}
