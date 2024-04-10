const btn = document.getElementById("title-display");
const titleDisplay = document.getElementById("title-tab");

const linkedinProfiles = ['https://www.linkedin.com/profile1', 'https://www.linkedin.com/profile2', 'https://www.linkedin.com/profile3'];

btn.addEventListener('click', async () => {
    for (let i = 0; i < linkedinProfiles.length; i++) {
        let win = window.open(linkedinProfiles[i], '_blank');
        win.focus();

        // Wait for the page to load
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Extract the required data
        let name = win.document.querySelector('.pv-top-card--list > li').innerText;
        let location = win.document.querySelector('.pv-top-card--list-bullet > li').innerText;
        let about = win.document.querySelector('.pv-about__summary-text').innerText;
        let bio = win.document.querySelector('.pv-entity__summary-info-list > li').innerText;
        let followerCount = win.document.querySelector('.pv-recent-activity-section-v2__follower-count').innerText;
        let connectionCount = win.document.querySelector('.pv-top-card--list-bullet > li:nth-child(2)').innerText;

        // Post the data to the API
        await fetch('http://localhost:3000/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                url: linkedinProfiles[i],
                about: about,
                bio: bio,
                location: location,
                followerCount: followerCount,
                connectionCount: connectionCount
            })
        });

        win.close();
    }
});
