import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Droplet, MessageCircle, Send, Award, ThumbsUp } from 'lucide-react';
import './Community.css';

const MOCK_NEWS = [
    { id: 1, title: "Monsoon Expected Early", desc: "Heavy rains predicted for next week. Prepare drainage.", type: "weather" },
    { id: 2, title: "Soil Health Alert", desc: "Nitrogen deficiency observed in local soil samples.", type: "soil" },
    { id: 3, title: "Govt. Subsidy on Solar Pumps", desc: "Apply before 30th to get 40% subsidy on new installations.", type: "policy" },
];

const INITIAL_POSTS = [
    { id: 1, user: "Dr. A. Swaminathan", role: "Expert", content: "To prevent root rot in tomatoes during monsoon, ensure raised beds are at least 15cm high. Also, apply Trichoderma viride.", likes: 142, replies: 12 },
    { id: 2, user: "Rajesh Farmer", role: "Farmer", content: "My wheat leaves are turning yellow at the tips. Is this water stress or a disease? I watered them 2 days ago.", likes: 8, replies: 5 },
    { id: 3, user: "Kissan Seva Kendra", role: "Expert", content: " ALERT: Fall Armyworm detected in local maize crops. check your fields early morning for larvae.", likes: 89, replies: 24 },
    { id: 4, user: "Vikram Singh", role: "Farmer", content: "Success story! I switched to organic neem spray for my Brinjal crop and the borer attack has reduced by 90%. happy to share formula.", likes: 56, replies: 18 },
    { id: 5, user: "Amit Kumar", role: "Farmer", content: "What is the current mandi price for Onion in Nashik? Hearing rumors of a price drop.", likes: 12, replies: 7 },
];

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [newQuery, setNewQuery] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch posts from backend on mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { communityAPI } = await import('../utils/api');
                const response = await communityAPI.getPosts();

                if (response.success && response.data?.posts) {
                    setPosts(response.data.posts);
                } else {
                    // Fallback to localStorage or initial posts
                    const saved = localStorage.getItem('krishi_posts');
                    setPosts(saved ? JSON.parse(saved) : INITIAL_POSTS);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
                // Fallback to localStorage or initial posts
                const saved = localStorage.getItem('krishi_posts');
                setPosts(saved ? JSON.parse(saved) : INITIAL_POSTS);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Persist to LocalStorage as backup
    useEffect(() => {
        if (posts.length > 0) {
            localStorage.setItem('krishi_posts', JSON.stringify(posts));
        }
    }, [posts]);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!newQuery.trim()) {
            alert("Please type a question first!");
            return;
        }

        const post = {
            user: "You (Farmer)",
            role: "Farmer",
            content: newQuery,
            likes: 0,
            replies: 0
        };

        // Optimistically update UI
        const tempPost = { ...post, id: Date.now() };
        setPosts([tempPost, ...posts]);
        setNewQuery("");

        // Sync to backend
        try {
            const { communityAPI } = await import('../utils/api');
            const response = await communityAPI.createPost(post);

            if (response.success && response.data?.post) {
                // Update with server-generated post (with proper ID)
                setPosts(prev => [
                    response.data.post,
                    ...prev.filter(p => p.id !== tempPost.id)
                ]);
            }
        } catch (error) {
            console.error('Failed to create post:', error);
            // Keep the optimistic update even if backend fails
        }
    };

    return (
        <div className="community-page container">
            {/* Sidebar: News & Weather */}
            <aside className="sidebar">
                <div className="widget glass weather-widget">
                    <h3><CloudRain size={20} /> Local Weather</h3>
                    <div className="weather-data">
                        <div className="temp">28°C</div>
                        <div className="condition">Cloudy</div>
                    </div>
                    <div className="details">
                        <span><Droplet size={14} /> 78% Hum</span>
                        <span><Sun size={14} /> UV Mod</span>
                    </div>
                </div>

                <div className="widget glass news-widget">
                    <h3>📢 Local Updates</h3>
                    {MOCK_NEWS.map(news => (
                        <div key={news.id} className="news-item">
                            <h4>{news.title}</h4>
                            <p>{news.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="widget glass expert-widget">
                    <h3>🏆 Top Expert</h3>
                    <div className="expert-profile">
                        <div className="avatar expert">E</div>
                        <div>
                            <h4>Dr. Swaminathan</h4>
                            <p>Soil Scientist</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Feed */}
            <main className="feed-section">
                <div className="create-post glass">
                    <h3>Ask the Community</h3>
                    <form onSubmit={handlePostSubmit}>
                        <textarea
                            placeholder="Describe your crop issue, ask about prices, or share tips..."
                            value={newQuery}
                            onChange={(e) => setNewQuery(e.target.value)}
                            required
                        ></textarea>
                        <div className="post-actions">
                            <button type="submit" className="btn btn-primary">
                                <Send size={16} /> Post Query
                            </button>
                        </div>
                    </form>
                </div>

                <div className="posts-list">
                    {posts.map(post => (
                        <div key={post.id} className={`post-card glass ${post.role === 'Expert' ? 'expert-post' : ''}`}>
                            <div className="post-header">
                                <div className={`avatar ${post.role === 'Expert' ? 'expert' : ''}`}>
                                    {post.user[0]}
                                </div>
                                <div className="user-info">
                                    <h4>
                                        {post.user}
                                        {post.role === 'Expert' && <span className="verified-badge"><Award size={12} /> Verified</span>}
                                    </h4>
                                    <span className="role">{post.role}</span>
                                </div>
                            </div>
                            <div className="post-content">
                                {post.content}
                            </div>
                            <div className="post-footer">
                                <button className="action-btn"><ThumbsUp size={16} /> {post.likes}</button>
                                <button className="action-btn"><MessageCircle size={16} /> {post.replies} Replies</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
