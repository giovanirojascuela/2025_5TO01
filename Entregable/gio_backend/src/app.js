import express from 'express';
import indexRouter from '../routes/index.js';
// >>> Adicione o middleware CORS aqui, se ainda não o fez e seu frontend está em uma porta diferente
import cors from 'cors'; // Certifique-se de ter instalado: npm install cors

const app = express();

app.set("port", process.env.PORT || 3005);

// Middleware para habilitar o CORS (se o frontend estiver em uma porta/domínio diferente)
app.use(cors()); // Importante!

// Middleware para parsear o corpo das requisições JSON (para POST, PUT, PATCH)
app.use(express.json());

// Middleware para parsear o corpo das requisições URL-encoded (dados de formulários)
app.use(express.urlencoded({ extended: true }));

/// >>> ROTAS
app.use("/", indexRouter); // Esta rota pode ser muito ampla, veja o ponto 3

// >>> Middleware de 404 - Posição e Tratamento
app.use((req, res) => {
    res.status(404).send("404 - No existe esa pagina"); // Defina explicitamente o status 404
});

// >>> Middleware de tratamento de erros (Altamente recomendado para APIs)
app.use((err, req, res, next) => {
    console.error(err.stack); // Registra o stack trace do erro no console do servidor
    res.status(500).send('Algo deu errado no servidor!'); // Envia uma resposta genérica de erro
});

app.listen(app.get("port"), () => {
    console.log("El servidor corre en el puerto", app.get("port"));
});