import { FilterError, IFilter } from './github-search';

export class PagingFilter implements IFilter {
	type: 'per_page' | undefined;
	size: string | undefined;

	constructor(query: string) {
		this.buildProps(query);
	}

	// buildProps amd validateFilter params can be interfaces with Generic type for all the filter classes

	buildProps(query: string) {
		if (query.match('per_page')) {
			this.type = 'per_page';
			
			const indx = query.match('=')?.index;
			if(indx)
				this.size = query.substring(indx+1);
		}
	}

	validateFilterParams(): FilterError[] {
		const errors: FilterError[] = [];

		if (!this.type)
			errors.push({ field: 'sort:', message: 'query param wrongly typed' });
		if (!this.size)
			errors.push({ field: 'order', message: 'query param wrongly typed' });
		
		return errors;
	}

	queryString(): string {
		if(!this.type) 
			return '';

		return `&${this.type}=${this.size}`;
	}
}
