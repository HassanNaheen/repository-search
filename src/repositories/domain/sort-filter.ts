import { FilterError, IFilter } from './github-search';

export class SortFilter implements IFilter {
	sort: 'sort=stars' | undefined;
	order: 'order=asc' | 'order=desc' | undefined;

	constructor(query: string) {
		this.buildProps(query);
	}

	// buildProps amd validateFilter params can be interfaces with Generic type for all the filter classes

	buildProps(query: string) {

		if (query.match('sort')) {
			this.sort = 'sort=stars';
			this.order = 'order=desc';
		}
	}

	validateFilterParams(): FilterError[] {
		const errors: FilterError[] = [];

		if (!this.sort)
			errors.push({ field: 'sort:', message: 'query param wrongly typed' });

		if (!this.order)
			errors.push({ field: 'order', message: 'query param wrongly typed' });
		
		return errors;
	}

	queryString(): string {
		if(!this.sort) 
			return '';
		return `&${this.sort}&${this.order}`;
	}
}
