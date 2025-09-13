/**
 * Social Media Post Management Script
 * Integrated with Supabase backend
 */

import { 
  getPosts, 
  createPost, 
  likePost, 
  unlikePost, 
  addComment 
} from './supabase.js'

// Post rendering function
export function renderPost(post, container) {
  const postElement = document.createElement('div')
  postElement.className = 'post'
  
  const hasMedia = post.media && post.media.length > 0
  const username = post.profiles?.username || 'Anonymous'
  const avatar = post.profiles?.avatar_url || 'default-avatar.png'

  postElement.innerHTML = `
    <div class="post-header">
      <img src="${avatar}" alt="${username}" class="avatar">
      <div class="post-info">
        <strong>${username}</strong>
        <small>${new Date(post.created_at).toLocaleString()}</small>
      </div>
    </div>
    <div class="post-content">
      <p>${post.content}</p>
      ${hasMedia ? `<img src="${post.media[0].url}" alt="Post media" class="post-media">` : ''}
    </div>
    <div class="post-actions">
      <button class="like-btn" data-post-id="${post.id}">
        ❤️ ${post.likes || 0}
      </button>
      <button class="comment-btn" data-post-id="${post.id}">
        💬 ${post.comments?.length || 0}
      </button>
    </div>
  `

  // Add event listeners
  const likeBtn = postElement.querySelector('.like-btn')
  likeBtn.addEventListener('click', async () => {
    const postId = likeBtn.dataset.postId
    const userId = (await getUser()).id
    
    try {
      if (likeBtn.classList.contains('liked')) {
        await unlikePost(postId, userId)
        likeBtn.classList.remove('liked')
      } else {
        await likePost(postId, userId)
        likeBtn.classList.add('liked')
      }
      // Refresh post display
      loadPosts()
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  })

  container.appendChild(postElement)
}

// Load posts into container
export async function loadPosts(container) {
  try {
    const posts = await getPosts()
    container.innerHTML = ''
    posts.forEach(post => renderPost(post, container))
  } catch (error) {
    console.error('Error loading posts:', error)
    container.innerHTML = '<p class="error">Failed to load posts. Please try again later.</p>'
  }
}

// Initialize posts
export function initializePosts(containerId = 'posts') {
  const container = document.getElementById(containerId)
  if (container) {
    loadPosts(container)
  }
}
