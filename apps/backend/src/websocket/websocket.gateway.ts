import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('WebsocketGateway');

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, room: string) {
        client.join(room);
        this.logger.log(`Client ${client.id} joined room: ${room}`);
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, room: string) {
        client.leave(room);
        this.logger.log(`Client ${client.id} left room: ${room}`);
    }

    // Notifications
    sendNotification(userId: string, message: any) {
        this.server.to(`user:${userId}`).emit('notification', message);
    }

    // Real-time updates
    sendCourseUpdate(courseId: string, update: any) {
        this.server.to(`course:${courseId}`).emit('courseUpdate', update);
    }

    // Chat messages
    sendMessage(roomId: string, message: any) {
        this.server.to(`chat:${roomId}`).emit('message', message);
    }
} 