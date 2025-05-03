# BlogWeb
A simple blog web app built with Node.js, Express, EJS, and Bootstrap. You can create, edit, and delete blog posts, all stored in a local JSON file.

# Features
- Create a new blog post with a title and content
- Edit existing posts
- Delete posts instantly
- Display all posts in a styled card layout
- Automatically saves data to `posts.json`

# Tech Stack
- Backend: Node.js, Express.js
- Templating: EJS
- Styling: Bootstrap 5, Custom CSS
- Storage: Local JSON (`data/posts.json`)
- Server Watcher: Nodemon with smart file ignoring

# Installation
- git clone https://github.com/alhadwan/blogWeb-project.git
- cd blogWeb-project
- nodemon index.js(stare the App)

# Notes
- added nodemon.json to prevent automatic server restarts when posts.json updates during deletes.

- File updates are handled with fs/promises and proper async/await.

- Routes are stable and redirect correctly without breaking CSS.



