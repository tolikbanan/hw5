import {Post} from '../../api/api.ts'

interface PostListProps {
    posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <div>
            <h3>Posts:</h3>
            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => <li key={post.id}>{post.title}</li>)
                ) : (
                    <p>No posts found.</p>
                )}
            </ul>
        </div>
    );
};

export default PostList;