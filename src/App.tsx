import './App.css'
import UserCard from "./components/UserCard/UserCard.tsx";
import { User, getUsers } from './api/api.ts';
import { useState, useEffect } from 'react';

const App = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsers();
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
                    users.map((user) => <UserCard key={user.id} user={user} />)
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default App;
