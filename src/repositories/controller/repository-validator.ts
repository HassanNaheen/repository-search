import { RequestQuery } from '../../api-models/request-query-dto';
import { DateFilter } from '../domain/date-filter';
import { SortFilter } from '../domain/sort-filter';
import { NoQueryParamFound, RequestValidationError } from './repository-validation-error';

export const validateRequestQueryParams =( queryObj:RequestQuery)=> {

	if(Object.values(queryObj).every(el => el === undefined))
		return new NoQueryParamFound();

	const df = new DateFilter(queryObj.dateFilter);
	const errors = df.validateFilterParams();
	
	const sf = new SortFilter(queryObj.sort);
	const sferrors = sf.validateFilterParams();

	const allErrors = [...errors,...sferrors];
	if(allErrors && allErrors.length > 0)	
		throw new RequestValidationError(errors);
	
	return true;
};



