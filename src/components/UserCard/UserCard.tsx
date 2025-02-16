import { useState } from 'react';
import { User, Post, getUserPosts } from '../../api/api.ts'
import PostList from '../PostList/PostList.tsx';
import styles from './styles.module.css'


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
        <div className={styles.card2}
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
                <div className={styles.card}>
                    {loading ? <p>Loading posts...</p> : <PostList posts={posts || []} />}
                </div>
            )}
        </div>
    );
};

export default UserCard;