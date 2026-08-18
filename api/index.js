import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Carregada" : "NÃO CARREGADA")

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Conectado ao banco de dados Mongo")
    })
    .catch((error) => {
        console.log("Erro ao conectar ao Mongo:")
        console.log(error)
    })

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    idade: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

app.get('/usuarios', async (req, res) => {
    try {
        const usuariosDoBanco = await Usuario.find()

        res.json(usuariosDoBanco)

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})

app.post('/usuarios', async (req, res) => {
    try {
        console.log("Dados recebidos:", req.body)

        const usuarioCriado = await Usuario.create(req.body)

        res.status(201).json(usuarioCriado)

    } catch (error) {
        console.log("ERRO:", error)

        res.status(500).json({
            erro: error.message
        })
    }
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})