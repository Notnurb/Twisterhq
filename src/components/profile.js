export class Profile {
    constructor(user) {
        this.user = user;
    }

    render() {
        const profileContainer = document.createElement('div');
        profileContainer.className = 'profile-container';
        
        const userName = document.createElement('h1');
        userName.textContent = this.user.name;

        const userBio = document.createElement('p');
        userBio.textContent = this.user.bio;

        profileContainer.appendChild(userName);
        profileContainer.appendChild(userBio);

        return profileContainer;
    }

    editProfile(newData) {
        this.user.name = newData.name || this.user.name;
        this.user.bio = newData.bio || this.user.bio;
    }
}