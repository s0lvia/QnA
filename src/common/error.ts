import { ErrorResponseObject } from '@akhilome/common';

export class RequestValidationException {
  constructor(public errObject: ErrorResponseObject) {}
}
