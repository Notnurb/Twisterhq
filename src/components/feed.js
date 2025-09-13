export class Feed {
    constructor() {
        this.posts = [];
    }

    async fetchPosts() {
        try {
            const response = await fetch('https://api.example.com/posts');
            this.posts = await response.json();
            this.render();
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    render() {
        const feedContainer = document.getElementById('feed');
        feedContainer.innerHTML = '';

        this.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
            `;
            feedContainer.appendChild(postElement);
        });
    }
}