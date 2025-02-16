import { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

const getPosts = async (): Promise<User[]> => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return [];
    }
};

const Cards = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPosts();
            setUsers(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Information</h1>
            <div>
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
                            <h2>{user.name}</h2>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                            <p>
                                Website:{' '}
                                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                                    {user.website}
                                </a>
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default Cards;