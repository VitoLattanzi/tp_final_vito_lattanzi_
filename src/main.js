import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import ENVIRONMENT from './config/environment.config.js';
import connectToMongoDB from './config/configMongoDB.config.js';

// Routers
import authRouter from './routes/auth.router.js';
import habitRouter from './routes/habit.router.js';
import entryRouter from './routes/entry.router.js';
import { errorHandler, notFoundHandler } from './utils/errors.js';

// Conexión a BD
await connectToMongoDB();

const app = express();

// Ruta de prueba para ver si explota
app.get('/api/_boom', (_req, _res) => {
  throw new Error('Boom!');
});

// Seguridad + utilitarios
app.use(cors({ origin: '*', credentials: true })); 
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Root
app.get('/', (_req, res) => {
  res.json({ ok: true, name: 'Momentum API', env: process.env.NODE_ENV || 'dev' });
});

// Rutas de la API
app.use('/api/auth', authRouter);
app.use('/api/habits', habitRouter);
app.use('/api/entries', entryRouter);

// 404 y manejo centralizado de errores
app.use(notFoundHandler);
app.use(errorHandler);


const PORT = ENVIRONMENT.PORT || 4000;

// Solo escuchamos el puerto si NO estamos en Vercel (para provar en local)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {    
        console.log(`🚀 API escuchando en http://localhost:${PORT}`);
    });
}

export default app;