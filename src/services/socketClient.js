import io from 'socket.io-client';
import globals from '../globals';

export default io(globals.API_URL);
