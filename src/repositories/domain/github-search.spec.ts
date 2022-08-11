/* eslint-disable no-mixed-spaces-and-tabs */
import {buildFilter} from './github-search';
import { DateFilter } from './date-filter';
import { SortFilter } from './sort-filter';
import { PagingFilter } from './page-filter';
import { LanguageFilter } from './language-filter';

describe('query params functionality', () => {

	test('should generate correct url from filter query params correctly', () => {
		const df = new DateFilter('created:>2022-08-01'); 
		const sf = new SortFilter('sort');
		const pf = new PagingFilter('per_page=10');
		const lf = new LanguageFilter('language:javascript');

		const list = [lf,df,sf,pf];
		const aa = buildFilter(list);

		expect(aa).toBe('https://api.github.com/search/repositories?q=language:javascript&created:>2022-08-01&sort=stars&order=desc&per_page=10');
		

	});

	test('wrong query params will show error messages ', () => {

		const df = new DateFilter('createdGGGG:>2022-08-01'); 
		
		const errors = df.validateFilterParams();

		expect(errors.length).toBeGreaterThan(0);
		

	});
	
});