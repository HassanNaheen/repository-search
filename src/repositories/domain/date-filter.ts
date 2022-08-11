import { IFilter, FilterError } from './github-search';

export class DateFilter implements IFilter {
	date: string | undefined;
	type: 'created:' | undefined;
	operators: '>' | '<' | undefined;

	constructor(query: string) {
		this.buildProps(query);
	}

	private buildProps(query: string) {
		const match = query.match('created:');
		if (match != null)
			this.type = 'created:';

		let match2 = query.match('>');
		if (match2 != null && match2?.index == 8)
			this.operators = '>';

		else {
			match2 = query.match('<');
			if (match2 != null && match?.index == 8)
				this.operators = '<';
		}

		let match3 = undefined;
		const indx = match2?.index;
		if(indx)
			match3 = query.substring(indx+1);
		if (match3) {
			if (this.isValidDate(match3))
				this.date = match3;
		}

	}

	queryString(): string {
		if(!this.type) 
			return '';
			
		return `&${this.type}${this.operators}${this.date}`;
	}

	validateFilterParams(): FilterError[] {
		const errors: FilterError[] = [];

		if (!this.type)
			errors.push({ field: 'created:', message: 'query param wrongly typed' });

		if (!this.operators)
			errors.push({ field: 'operators', message: '> or < query param wrongly typed' });

		if (!this.date)
			errors.push({ field: 'date', message: 'date is not in a correct format: yyyy-mm-dd' });

		return errors;
	}

	isValidDate(dateString: string) {

		const regEx = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateString.match(regEx))
			return false;
		const d = new Date(dateString);
		const dNum = d.getTime();
		if (!dNum && dNum !== 0)
			return false;
		return d.toISOString().slice(0, 10) === dateString;
	}
}
