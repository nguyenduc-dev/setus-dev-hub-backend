import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { characterRouter } from './routes/character.router'
import { cardRouter } from './routes/card.router'
import { mechanicRouter } from './routes/mechanic.router'
import { regionRouter } from './routes/region.router'
import taskRouter from './routes/task.router'
import { miniBossRouter } from './routes/miniboss.router'
import { specialEquipmentRouter } from './routes/specialequipment.router'
import uploadRouter from './routes/upload.router'
import { AppError } from './utils/AppError'
import path from 'path'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    }
})

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'public')))

// Socket.io
io.on('connection', (socket) => {
    console.log('⚡ A user connected:', socket.id)

    socket.on('task_updated', (data) => {
        socket.broadcast.emit('task_updated', data)
    })

    socket.on('disconnect', () => {
        console.log('❌ User disconnected')
    })
})

// Routes
app.use('/api/characters', characterRouter)
app.use('/api/cards', cardRouter)
app.use('/api/mechanics', mechanicRouter)
app.use('/api/regions', regionRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/minibosses', miniBossRouter)
app.use('/api/special-equipment', specialEquipmentRouter)
app.use('/api/upload', uploadRouter)

// Undefined Routes
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
})

const PORT = process.env.PORT || 4000
server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(
        `🚀 Server is running on port ${PORT} (mapped to all interfaces)`
    )
})
