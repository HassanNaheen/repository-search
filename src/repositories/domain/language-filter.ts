import { FilterError, IFilter } from './github-search';

export class LanguageFilter implements IFilter {
	type: 'language:' | undefined;
	language: string | undefined;

	constructor(query: string) {
		this.buildProps(query);
	}

	// buildProps amd validateFilter params can be interfaces with Generic type for all the filter classes

	buildProps(query: string) {
		if (query.match('language:')) {
			this.type = 'language:';
			
			const indx = query.match(':')?.index;
			if(indx)
				this.language = query.substring(indx+1);
		}
	}

	validateFilterParams(): FilterError[] {
		const errors: FilterError[] = [];

		if (!this.type)
			errors.push({ field: 'programming language:', message: 'query param wrongly typed' });
		
		return errors;
	}

	queryString(): string {
		if(!this.type) 
			return '';
			
		return `${this.type}${this.language}`;
	}
}
