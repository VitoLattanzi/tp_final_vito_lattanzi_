
export const errorHandler = (err, _req, res, _next) => {
  // express-validator support (si lo usás más adelante)
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
