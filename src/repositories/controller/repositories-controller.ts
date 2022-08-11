import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Repository } from '../../api-models/repository-dto';
import { ParsedQs } from 'qs';
import { RequestQuery } from '../../api-models/request-query-dto';
import { validateRequestQueryParams } from './repository-validator';
import { RepositoryService } from '../repository-service';
import  { errorHandler } from '../../infrastructure/error-handler';
import { CustomError } from '../../infrastructure/custom-error';


export const getRepositories = async (req: Request, res: Response) => {
	let resp:unknown;
	try{
		const queryObj = parseQuery(req.query);
		validateRequestQueryParams(queryObj);

		const service = new RepositoryService(queryObj);
		const url = await service.buildRequestQueryFilter();
		const result: AxiosResponse = await axios.get(url);

		const repositories: Repository[]  = JSON.parse(result.data);
		resp = res.status(200).json({
			message: repositories
		});
	}
	catch(error)
	{
		if(error instanceof CustomError)
			resp = errorHandler(error,res);
	}

	return resp;
};
enum QueryParams {
    dateFilter = 'date',
    sort = 'sort',
    order = 'order',
    language ='q',
    per_page = 'per_page'
}

function parseQuery(query: ParsedQs):RequestQuery {
	
	const obj: RequestQuery = {dateFilter:'', language:'',per_page:'',sort:'', order:''} ;
	if(query[QueryParams.dateFilter])
	{
		obj.dateFilter = query[QueryParams.dateFilter] as string;
	}

	if(query[QueryParams.sort] && query[QueryParams.order]){
		obj.sort = QueryParams.sort + '=';
		obj.sort += query[QueryParams.sort] as string;

		obj.order = QueryParams.order + '=';
		obj.order += query[QueryParams.order] as string;
	}

	if(query[QueryParams.language]){
		obj.language = query[QueryParams.language] as string;
	}

	if(query[QueryParams.per_page]){
		obj.per_page = QueryParams.per_page + '=';
		obj.per_page += query[QueryParams.per_page] as string;
	}

	return obj;
}

export default { getRepositories };

