import { Server } from './src/models/Server.model';

export const server: Server = new Server('/api');

server.listen(Number(process.env.SERVER_PORT) | 3000);