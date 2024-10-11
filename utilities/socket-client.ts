import { Manager, Socket } from "socket.io-client";



export const connectToServer = (renewData: () => void) => {
    // http://localhost:3000/socket.io/socket.io.js


    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')

    const socket = manager.socket('/');

    addListeners(socket, renewData);


}

const addListeners = (socket: Socket, renewData: () => void) => {

    socket.on('connect', () => {
        console.log('connected');
    })

    socket.on('disconnect', () => {
        console.log('disconnect');
    })

    socket.on('clients-updated', (clients: string[]) => {
        console.log({ clients })
    })

    socket.on('OrdersChanged', (mensaje: string) => {
        console.log({ mensaje })
        renewData();
    })

}

// export const addActionToOrdersChanged = () => {
//     socket.on('OrdersChanged', (mensaje: string) => {
//         console.log({ mensaje })
//     })
// }