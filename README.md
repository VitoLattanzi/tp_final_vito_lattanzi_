🚀 Momentum API – Plataforma de Seguimiento de Hábitos

    API RESTful completa para la gestión, seguimiento y análisis de hábitos, construida con arquitectura profesional y orientada a producción.

🧩 📌 1. OBJETIVO DEL PROYECTO

    Momentum ofrece una API segura y estructurada para:

    Registrar usuarios con verificación por email.

    Autenticar mediante JWT.

    Crear y gestionar hábitos personalizados.

    Registrar progreso diario de cada hábito.

    Calcular rachas (streaks) y mejores marcas.

    Obtener historial de desempeño (últimos 7 días) para visualizar progreso.

    Todo esto siguiendo arquitectura en capas:
    Routes → Controllers → Services → Repositories → MongoDB

🛠️ 📌 2. STACK TECNOLÓGICO

    Tecnología	Uso
    Node.js 18+	Runtime del backend
    Express.js 4+	Framework HTTP
    MongoDB + Mongoose	Base de datos NoSQL
    JWT	Autenticación segura
    bcryptjs	Hashing de contraseñas
    Nodemailer	Envío de correos (verificación)
    dotenv	Variables de entorno
    CORS	Seguridad de acceso
    Vercel / Render	Hosting


📦 📌 3. ESTRUCTURA DE CARPETAS

    src/
    ├── config/
    │   ├── configMongoDB.config.js
    │   ├── environment.config.js
    │   └── mailTransporter.config.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── habit.controller.js
    │   └── habitEntry.controller.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── Habit.model.js
    │   ├── HabitEntry.model.js
    │   └── User.model.js
    ├── repositories/
    │   ├── habit.repository.js
    │   ├── habitEntry.repository.js
    │   └── user.repository.js
    ├── routes/
    │   ├── auth.router.js
    │   ├── entry.router.js
    │   └── habit.router.js
    ├── schemas/
    │   ├── auth.schema.js
    │   └── habit.schema.js
    ├── services/
    │   ├── auth.service.js
    │   ├── habit.service.js
    │   └── habitEntry.service.js
    ├── utils/
    │   └── errors.js
    └── main.js

🗂️ 📌 4. MODELADO DE DATOS (Mongoose)

    User{        
        name: String,
        email: String,
        password: String,
        verified_email: Boolean,
        createdAt: Date
    }

    Habit{
        userId: ObjectId(ref User),
        name: String,
        type: "numeric" | "boolean",
        dailyGoal: Number,
        unit: String,
        color: String,
        currentStreak: Number,
        bestStreak: Number,
        lastEntryDate: String ("YYYY-MM-DD"),
        active: Boolean
    }

    HabitEntry {   
        habitId: ObjectId(ref Habit),
        date: "YYYY-MM-DD",
        value: Number
    }

🔗 📌 5. ENDPOINTS DE LA API

    🔐 Autenticación
        Método	Endpoint	Descripción
        POST	/api/auth/register              Registrarse + Envío de email
        POST	/api/auth/login                 Iniciar sesión (JWT)
        GET	    /api/auth/verify-email/:token   Verifica el email
        📝 Hábitos
        Método	Endpoint	Descripción
        GET	    /api/habits	                    Listar hábitos del usuario
        POST	/api/habits	                    Crear hábito
        PUT 	/api/habits/:habitId	        Editar hábito
        DELETE	/api/habits/:habitId	        Eliminar hábito

    Body para crear hábito
        {
        "name": "Leer",
        "type": "numeric",
        "unit": "páginas",
        "dailyGoal": 10,
        "color": "#FF0000"
        }

📈 Entradas (Progreso diario)
    Método	Endpoint	Descripción
        POST	    /api/habits/:habitId/entries	        Registrar progreso
        GET	        /api/entries/:habitId/history?days=7	Historial de 7 días FULL/PARTIAL/NONE

🧩 📌 6. MIDDLEWARE DE AUTENTICACIÓN
    Authorization: Bearer <JWT>


    Valida token, coloca req.user = { id, name, email }.

🛠️ 📌 7. VARIABLES DE ENTORNO
    PORT=
    MONGO_DB_CONECTION_STRING=
    JWT_SECRET=
    GMAIL_USER=
    GMAIL_PASSWORD=
    URL_FRONTEND=

📬 📌 8. POSTMAN COLLECTION

Incluye pruebas para:

    login / register

    crear hábitos

    registrar progreso

    historial 7 días

✔️ 📌 9. ESTADO ACTUAL

Funciona:

    Registro + email + login

    CRUD de hábitos

    Registrar progreso diario

    Historial 7 días

    Streaks (actual y mejor racha)

    Validaciones y errores correctos

🎉 Autor

Vito Lattanzi – Full Stack Developer