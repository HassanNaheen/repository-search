import { CustomError } from '../../infrastructure/custom-error';


type FilterError = { message :string,field:string};

export class RequestValidationError extends CustomError {
	statusCode = 400;
	
	constructor(public errors:FilterError[]) {
		super('Invalid Request Query Parameters');
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}
	serializeErrors() {
		return this.errors.map((err) => {
			return { message: err.message, field: err.field };
		});
	}
}

export class NoQueryParamFound extends CustomError {
	statusCode = 400;
	constructor(){
		super('Query params not not found');
		Object.setPrototypeOf(this, NoQueryParamFound.prototype);
	}
	serializeErrors(){
		return [{message: 'No query parameters found'}];
	}
}