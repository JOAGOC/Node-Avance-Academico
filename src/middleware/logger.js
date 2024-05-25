// /src/middleware/logger.js
// Importar el módulo 'redis' para interactuar con una base de datos Redis
const redis = require('redis');
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
client.on('error', (err) => {
    console.error('Redis error de conexion:', err);
});
client.connect().then(() => {
    console.log('Conectado-->> Redis');
}).catch((err) => {
    console.error('Error conexion a Redis:', err);
});
module.exports = (req, res, next) => {
    const originalSend = res.send;
    let responseBody;

    res.send = function (body) {
        responseBody = body;
        return originalSend.apply(this, arguments);
    };

    res.on('finish', async () => {
        if (!client.isOpen) {
            console.error('Redis client -->> No conectado.');
            return;
        }
        const key = `${req.method}:${Date.now()}:${req.originalUrl}`;
        const logEntry = JSON.stringify({
            time: new Date(),
            req: {
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                data: req.body
            },
            res: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                response: responseBody
            }
        });
        try {
            await client.set(key, logEntry, 'EX', 60 * 60 * 24);
        } catch (err) {
            console.error('Error al salvar:', err);
        }
    });
    next();
};