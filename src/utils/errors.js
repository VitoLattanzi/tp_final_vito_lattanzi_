export class CustomError extends Error {
  constructor(message = 'Bad Request', status = 400) {
    super(message);
    this.status = status;
  }
}
export class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') { super(message, 400); }
}
export class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized') { super(message, 401); }
}
export class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden') { super(message, 403); }
}
export class NotFoundError extends CustomError {
  constructor(message = 'Not Found') { super(message, 404); }
}
export class ConflictError extends CustomError {
  constructor(message = 'Conflict') { super(message, 409); }
}
export class ServerError extends CustomError {
  constructor(message = 'Internal Server Error') { super(message, 500); }
}

// helper opcional para envolver controladores async y evitar try/catch en cada uno
export const handleAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
