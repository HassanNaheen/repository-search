import { buildFilter } from './domain/github-search';
import { PagingFilter } from './domain/page-filter';
import { SortFilter } from './domain/sort-filter';
import { DateFilter } from './domain/date-filter';
import { RequestQuery } from '../api-models/request-query-dto';
import { LanguageFilter } from './domain/language-filter';

export class RepositoryService
{
	readonly queryObj:RequestQuery;
	constructor(queryObj:RequestQuery){
		this.queryObj = queryObj;
	}

	async buildRequestQueryFilter()
	{
		const df = new DateFilter(this.queryObj.dateFilter); 
		const sf = new SortFilter(this.queryObj.sort);
		const lf = new LanguageFilter(this.queryObj.language);
		const pf = new PagingFilter(this.queryObj.per_page);

		return buildFilter([lf,df,sf,pf]);
	}
}