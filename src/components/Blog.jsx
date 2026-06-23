import React from 'react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Top Digital Marketing Trends for 2026',
      excerpt: 'Discover the latest strategies, AI tools, and social media platforms that will drive business growth in 2026.',
      date: 'June 18, 2026',
      readTime: '5 min read',
      category: 'Marketing'
    },
    {
      id: 2,
      title: 'Why Custom Web Development Beats WordPress',
      excerpt: 'A comprehensive comparison between custom-coded web solutions and standard template-based setups for scaling modern businesses.',
      date: 'May 24, 2026',
      readTime: '8 min read',
      category: 'Development'
    },
    {
      id: 3,
      title: 'The Essential Guide to SEO in 2026',
      excerpt: 'Learn how Google’s search algorithms have changed and what key optimizations your website needs to remain visible.',
      date: 'April 12, 2026',
      readTime: '6 min read',
      category: 'SEO'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto min-h-screen text-[#012869]">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-[#012869] mb-4">
          Latest Insights & Blog
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-[#012869]/80 font-medium">
          Stay updated with the latest trends in web development, design, and digital growth.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white/60 backdrop-blur-md border border-[#012869]/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#fe8d00]/15 text-[#fe8d00] px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h2 className="text-xl font-bold font-serif text-[#012869] mb-3 hover:text-[#fe8d00] cursor-pointer transition-colors duration-200">
              {post.title}
            </h2>
            <p className="text-sm text-[#012869]/70 leading-relaxed mb-6 font-medium">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-[#012869]/60 font-bold border-t border-[#012869]/10 pt-4">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
