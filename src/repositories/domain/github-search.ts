// todo: ideally should have seperate files for each class
// each class will be seperate filter class, and seperate way to generate query string



const baseUrl = 'https://api.github.com/search/repositories?q=';

export interface IFilter{
    queryString():string;
}

export type FilterError = { message :string,field:string};

const buildFilter = (filters:IFilter[]):string => {
	
	let query = '';
	filters.forEach(fi => {
		query += fi.queryString();
	});

	return baseUrl + query;
};

export {buildFilter};

