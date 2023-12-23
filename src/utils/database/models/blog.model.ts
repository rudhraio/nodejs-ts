import { promises as fsPromises } from 'fs';
import configs from '../../configs';
import logger from '../../helpers/logger';

interface BlogInterface {
    id: string;
    title: string;
    description: string;
    slug: string;
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
            logger(`Error writing blogs to file: ${err}`, false);
        }
    }

    async loadBlogs() {
        try {
            const data = await fsPromises.readFile(configs.url, 'utf-8');
            this.data = JSON.parse(data);
        } catch (err) {
            logger(`Error writing blogs to file:, ${err}`);
        }
    }

    convertToURL(title: string) {
        let url = title.toLowerCase();
        url = url.replace(/[^\w\s]/g, '');
        url = url.replace(/\s+/g, '-');
        return url;
    }

    list(): BlogInterface[] {
        return this.data;
    }

    getById(id: any): BlogInterface | undefined {
        let data = this.data.find(blog => blog.id == id);
        if (!data) {
            data = this.data.find(blog => blog.slug == id);
        }
        return data
    }

    create(newBlog: BlogInterface): Promise<BlogInterface> {
        return new Promise((resolve, reject) => {
            newBlog.slug = this.convertToURL(newBlog.title);
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
                updatedBlog.slug = this.convertToURL(updatedBlog.title);
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
    const randomString = Math.random().toString(36).substring(2, 6);

    const uniqueString = `iD${randomString}${timestamp}`; // Combine timestamp and random string and take the first 16 characters
    return uniqueString;
}

const Blog = new BlogModel();

export default Blog;