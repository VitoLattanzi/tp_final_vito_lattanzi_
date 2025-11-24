export class CustomError extends Error {
  constructor(message = 'Bad Request', status = 400) {
    super(message);
    this.status = status;
  }
}
export class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') { 
    super(message, 400);
  };
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

export const errorHandler = (err, _req, res, _next) => {
  if (err?.errors && Array.isArray(err.errors)) {
    const messages = err.errors.map(e => e.msg || e.message || String(e));
    return res.status(400).json({ error: 'Validation error', details: messages });
  }

  const status = Number.isInteger(err?.status) ? err.status : 500;
  const payload = {
    error: err?.message || 'Unexpected error',
  };

  // log básico
  if (status >= 500) {
    console.error('[SERVER ERROR]', err);
  } else {
    console.warn('[CLIENT ERROR]', payload);
  }

  res.status(status).json(payload);
};
export const notFoundHandler = (_req, res, _next) => {
  res.status(404).json({ error: 'Not Found' });
};


// helper opcional para envolver controladores async y evitar try/catch en cada uno
export const handleAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
