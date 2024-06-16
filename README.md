WatchBuddy
WatchBuddy is an application that helps you decide what to watch by providing personalized recommendations based on your selected genres, moods, and streaming services.

Table of Contents
Tech Stack
Features
Getting Started
Usage
Project Structure
Contributing
License
Tech Stack
Next.js: A powerful React framework for building fast, server-side rendered applications.
Chakra UI: A modern and responsive component library for React.
Vercel: A cloud platform for static sites and Serverless Functions, used for continuous deployment.
GitHub: For version control and collaboration.
Features
Personalized Recommendations: Get recommendations based on selected genres, moods, and streaming services.
Responsive Design: Optimized for both desktop and mobile devices using Chakra UI.
Continuous Deployment: Automatic deployments with Vercel for seamless integration and updates.
Getting Started
Prerequisites
Node.js (v14 or higher)
npm or yarn
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/YourUsername/WatchBuddy.git
cd WatchBuddy
Install dependencies:

sh
Copy code
npm install
# or
yarn install
Running the Application
Start the development server:

sh
Copy code
npm run dev
# or
yarn dev
Open your browser and navigate to http://localhost:3000.

Usage
On the homepage, enter a movie or television show title in the search bar.
Select your preferred genres and moods by clicking on the "Add genre/mood" button.
Choose your streaming services by clicking on the "Add your streaming services" button.
Click "Get Recommendations" to receive personalized movie recommendations.
Project Structure
arduino
Copy code
├── public
│   ├── images
│   │   └── (all image assets)
├── src
│   ├── components
│   │   ├── SearchBar.jsx
│   │   ├── SelectionButton.jsx
│   │   ├── StreamingServiceButton.jsx
│   ├── pages
│   │   ├── index.jsx
│   │   ├── mockRecommendation.jsx
│   ├── styles
│   │   └── theme.js
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── vercel.json
Contributing
We welcome contributions to improve WatchBuddy. To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.
License
This project is licensed under the MIT License.
