export interface Repository {
    full_name: string;
    owner: Owner;
    html_url: string;
    description: string;
    url: string;
    created_at: Date;
    updated_at: Date;
    pushed_at: Date;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    watchers: number;    
}
interface Owner {
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;

}
