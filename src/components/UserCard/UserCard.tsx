import { useState } from 'react';
import { User, Post, getUserPosts } from '../../api/api.ts'
import PostList from '../PostList/PostList.tsx';


interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleUserClick = async () => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }

        setLoading(true);
        const userPosts = await getUserPosts(user.id);
        setPosts(userPosts);
        setLoading(false);
        setIsOpen(true);
    };

    return (
        <div
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', cursor: 'pointer' }}
            onClick={handleUserClick}
        >
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>
                Website:{' '}
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                    {user.website}
                </a>
            </p>

            {isOpen && (
                <div style={{ marginTop: '10px', paddingLeft: '10px', borderTop: '1px solid #ddd' }}>
                    {loading ? <p>Loading posts...</p> : <PostList posts={posts || []} />}
                </div>
            )}
        </div>
    );
};

export default UserCard;