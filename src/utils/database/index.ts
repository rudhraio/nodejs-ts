import { promises as fsPromises } from 'fs';
import configs from '../configs';

async function connectDB() {
    const url = configs.url;

    // This is a sample db connection
    // Replace this with your actual db connection code.
    try {
        await fsPromises.readFile(url, 'utf-8');
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            // Create a new file if it doesn't exist
            await fsPromises.writeFile(url, '[]', 'utf-8');
        } else {
            console.log('Error reading records file:', err);
        }
    }
}

export default connectDB;