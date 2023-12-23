import { promises as fsPromises } from 'fs';
import configs from '../../configs';

interface BlogInterface {
    id: string;
    title: string;
    description: string;
    image?: string;
    author?: string;
    created_at: Date;
}

class BlogModel {
    private data: BlogInterface[] = [];

    constructor() {
        this.loadBlogs();
    }

    async saveBlogsToFile() {
        try {
            await fsPromises.writeFile(configs.url, JSON.stringify(this.data, null, 2));
        } catch (err) {
            console.log('Error writing blogs to file:', err);
        }
    }

    async loadBlogs() {
        try {
            const data = await fsPromises.readFile(configs.url, 'utf-8');
            this.data = JSON.parse(data);
        } catch (err) {
            console.log('Error writing blogs to file:', err);
        }
    }

    list(): BlogInterface[] {
        return this.data;
    }

    getById(id: any): BlogInterface | undefined {
        console.log("id", id);
        return this.data.find(blog => blog.id == id);
    }

    create(newBlog: BlogInterface): Promise<BlogInterface> {
        return new Promise((resolve, reject) => {
            newBlog.created_at = new Date();
            newBlog.id = generateUniqueString();
            this.data.push(newBlog);
            this.saveBlogsToFile()
                .then(() => resolve(newBlog))
                .catch(err => reject(err));
        });
    }

    update(id: string, updatedBlog: BlogInterface): Promise<BlogInterface | undefined> {
        return new Promise((resolve, reject) => {
            const index = this.data.findIndex(blog => blog.id === id);
            if (index !== -1) {
                this.data[index] = { ...this.data[index], ...updatedBlog };
                this.saveBlogsToFile()
                    .then(() => resolve(this.data[index]))
                    .catch(err => reject(err));
            } else {
                resolve(undefined);
            }
        });
    }

    remove(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.data = this.data.filter(blog => blog.id !== id);
            this.saveBlogsToFile()
                .then(() => resolve(true))
                .catch(err => reject(err));
        });
    }
}

function generateUniqueString() {
    const timestamp = new Date().getTime().toString(36);
    console.log(timestamp);
    const randomString = Math.random().toString(36).substring(2, 6);
    console.log(randomString);

    const uniqueString = `iD${randomString}${timestamp}`; // Combine timestamp and random string and take the first 16 characters
    return uniqueString;
}

const Blog = new BlogModel();

export default Blog;