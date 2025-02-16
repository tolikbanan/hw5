export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
    }
};

export const getUserPosts = async (userId: number): Promise<Post[]> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch posts for user ${userId}:`, error);
        return [];
    }
};