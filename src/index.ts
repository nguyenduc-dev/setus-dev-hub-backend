import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { characterRouter } from './routes/character.router'
import { cardRouter } from './routes/card.router'
import { mechanicRouter } from './routes/mechanic.router'
import { regionRouter } from './routes/region.router'
import taskRouter from './routes/task.router'
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

const collaborationUsers = new Map<string, { id: string; name: string }>()

// Socket.io
io.on('connection', (socket) => {
    console.log('⚡ A user connected:', socket.id)

    socket.on('task_updated', (data) => {
        socket.broadcast.emit('task_updated', data)
    })

    socket.on('join_collaboration', (userData) => {
        collaborationUsers.set(socket.id, {
            id: socket.id,
            name: userData.name
        })
        io.emit(
            'collaboration_users_update',
            Array.from(collaborationUsers.values())
        )
    })

    socket.on('leave_collaboration', () => {
        collaborationUsers.delete(socket.id)
        io.emit(
            'collaboration_users_update',
            Array.from(collaborationUsers.values())
        )
    })

    socket.on('webrtc_signal', ({ targetId, signal }) => {
        io.to(targetId).emit('webrtc_signal', {
            senderId: socket.id,
            signal
        })
    })

    socket.on('disconnect', () => {
        console.log('❌ User disconnected')
        if (collaborationUsers.has(socket.id)) {
            collaborationUsers.delete(socket.id)
            io.emit(
                'collaboration_users_update',
                Array.from(collaborationUsers.values())
            )
        }
    })
})

// Routes
app.use('/api/characters', characterRouter)
app.use('/api/cards', cardRouter)
app.use('/api/mechanics', mechanicRouter)
app.use('/api/regions', regionRouter)
app.use('/api/tasks', taskRouter)
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
server.listen(Number(PORT), () => {
    console.log(
        `🚀 Server is running on port ${PORT} (mapped to all interfaces)`
    )
})
