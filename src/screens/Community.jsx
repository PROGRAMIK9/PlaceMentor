import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Pin
} from 'lucide-react';
import './community.css';

const filterChips = [
  'All',
  'Questions',
  'Discussions',
  'Interview Experiences',
  'Success Stories',
  'Study Groups'
];

const postsData = [
  {
    id: 1,
    type: 'question',
    author: 'Sneha Gupta',
    avatar: 'SG',
    avatarColor: 'purple',
    time: '2h ago',
    title: 'Best approach for learning System Design?',
    body: "I'm in 6th sem and want to start system design prep. Should I focus on HLD or LLD first? Any resource recommendations?",
    tags: ['#SystemDesign', '#Preparation'],
    likes: 12,
    comments: 8,
    liked: false,
    bookmarked: true,
    pinned: false
  },
  {
    id: 2,
    type: 'interview',
    author: 'Rahul Kumar',
    avatar: 'RK',
    avatarColor: 'green',
    time: '5h ago',
    title: 'TCS Digital Interview Experience 2024',
    body: 'Just completed my TCS Digital interview! 3 rounds - Aptitude, Technical, HR. They asked about DBMS normalization, 2 DSA questions (medium level)...',
    tags: ['#TCS', '#InterviewExperience'],
    likes: 45,
    comments: 22,
    liked: false,
    bookmarked: false,
    pinned: false
  },
  {
    id: 3,
    type: 'success',
    author: 'Ananya Patel',
    avatar: 'AP',
    avatarColor: 'accent',
    time: '1d ago',
    title: "Got placed at Microsoft! Here's my journey 🎉",
    body: "After 6 months of dedicated preparation with my mentor's guidance, I finally got placed at Microsoft! Here's what worked for me...",
    tags: ['#SuccessStory', '#Microsoft'],
    likes: 128,
    comments: 34,
    liked: false,
    bookmarked: false,
    pinned: true
  },
  {
    id: 4,
    type: 'discussion',
    author: 'Vikram Singh',
    avatar: 'VS',
    avatarColor: 'warm',
    time: '1d ago',
    title: 'Study group for Amazon SDE preparation',
    body: "Looking for 4-5 people to form a study group for Amazon preparation. We'll practice 2 DSA problems daily and do weekly mock interviews.",
    tags: ['#StudyGroup', '#Amazon'],
    likes: 23,
    comments: 15,
    liked: false,
    bookmarked: false,
    pinned: false
  },
  {
    id: 5,
    type: 'anonymous',
    author: 'Anonymous',
    avatar: '?',
    avatarColor: 'grey',
    time: '2d ago',
    title: 'Is it normal to feel overwhelmed during placement season?',
    body: "Everyone around me seems so prepared and I feel like I'm falling behind. Any tips on managing stress?",
    tags: ['#MentalHealth', '#Support'],
    likes: 67,
    comments: 28,
    liked: false,
    bookmarked: false,
    pinned: false
  }
];

const typeLabels = {
  question: 'Question',
  interview: 'Interview Exp',
  success: 'Success Story',
  discussion: 'Discussion',
  anonymous: 'Anonymous'
};

export default function Community() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [posts, setPosts] = useState(postsData);

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const toggleBookmark = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p
      )
    );
  };

  return (
    <section className="community">
      {/* Header */}
      <header className="community-header">
        <h1>Community</h1>
        <div className="community-header-actions">
          <button className="community-header-btn" aria-label="Search posts">
            <Search size={20} />
          </button>
          <button className="community-header-btn" aria-label="Create post">
            <Plus size={20} />
          </button>
        </div>
      </header>

      {/* Filter Chips */}
      <div className="community-filters">
        {filterChips.map((chip) => (
          <button
            key={chip}
            className={`community-filter-chip ${activeFilter === chip ? 'active' : ''}`}
            onClick={() => setActiveFilter(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="community-feed">
        {posts.map((post) => (
          <article key={post.id} className="community-post">
            {/* Pinned Badge */}
            {post.pinned && (
              <div className="community-post-pinned">
                <Pin size={10} />
                Pinned
              </div>
            )}

            {/* Post Header */}
            <div className="community-post-header">
              <div className={`community-post-avatar ${post.avatarColor}`}>
                {post.avatar}
              </div>
              <div className="community-post-author">
                <div className="community-post-author-row">
                  <h4>{post.author}</h4>
                  <span className={`community-post-type-badge ${post.type}`}>
                    {typeLabels[post.type]}
                  </span>
                </div>
                <span>{post.time}</span>
              </div>
              <button className="community-post-more" aria-label="More options">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Post Body */}
            <h3 className="community-post-title">{post.title}</h3>
            <p className="community-post-body">{post.body}</p>

            {/* Tags */}
            <div className="community-post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="community-post-tag">{tag}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="community-post-actions">
              <button
                className={`community-post-action ${post.liked ? 'liked' : ''}`}
                onClick={() => toggleLike(post.id)}
              >
                <Heart size={16} />
                {post.likes}
              </button>
              <button className="community-post-action">
                <MessageCircle size={16} />
                {post.comments}
              </button>
              <button
                className={`community-post-action ${post.bookmarked ? 'bookmarked' : ''}`}
                onClick={() => toggleBookmark(post.id)}
                style={{ marginLeft: 'auto' }}
              >
                <Bookmark size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="community-fab" aria-label="Create new post">
        <Plus size={24} />
      </button>
    </section>
  );
}
