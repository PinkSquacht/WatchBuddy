# WatchBuddy 🎬

WatchBuddy is a movie and TV show recommendation application that helps you discover what to watch based on your preferences. Simply enter a movie title, select your favorite genres and moods, choose your streaming services, and get instant recommendations!

## 🌟 Features

- **Instant Recommendations**: Get movie and TV show recommendations instantly without API costs
- **Genre & Mood Filtering**: Select up to 6 genres and moods to personalize your search
- **Streaming Service Integration**: Filter recommendations based on available streaming services (Netflix, Hulu, Amazon Prime, HBO Max)
- **Detailed Movie Information**: Each recommendation includes runtime, Rotten Tomatoes ratings, synopsis, reviews, and IMDB links
- **Responsive Design**: Beautiful, mobile-first UI built with Chakra UI
- **Zero API Dependencies**: No API keys or external service costs required

## 🛠 Tech Stack

- **Next.js 14**: React framework for production
- **Chakra UI**: Modern component library for responsive UI
- **JavaScript/JSX**: Frontend logic
- **Node.js**: Development environment

## 📋 Prerequisites

- Node.js v14 or higher
- npm or yarn

## 🚀 Getting Started

### Installation

Clone and setup:
```bash
git clone https://github.com/YourUsername/WatchBuddy.git
cd WatchBuddy
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

Open **http://localhost:3000** in your browser (or http://localhost:3001 if port 3000 is in use)

## 📖 How to Use

1. **Enter a Movie Title**: Type in the search bar
2. **Select Genres & Moods**: Click "Add genre/mood" and choose up to 6 options
3. **Choose Streaming Services** *(optional)*: Filter by Netflix, Hulu, Amazon Prime, or HBO Max
4. **Get Recommendations**: Click to see personalized suggestions
5. **Explore**: Click IMDB links for more details

## 📁 Project Structure

```
WatchBuddy/
├── pages/
│   ├── index.jsx                 # Homepage
│   ├── recommendations.jsx       # Main recommendations page
│   ├── mockRecommendation.jsx   # Alternative mock page
│   └── api/recommendations.js    # API endpoint
├── components/
│   ├── SearchBar.jsx
│   ├── SelectionButton.js
│   └── StreamingServiceButton.jsx
├── styles/
│   ├── Home.module.css
│   ├── recommendations.module.css
│   └── theme.js                 # Chakra custom theme
├── public/images/               # Logos and assets
├── jsconfig.json
├── next.config.mjs
└── package.json
```

## 🎯 Available Options

**Genres**: Action, Adventure, Animation, Comedy, Documentary, Drama, Fantasy, Horror, Musical, Romantic Comedy, Sci-Fi, Thriller/Suspense

**Moods**: Cynical, Funny, Gripping, Intense, Heartwarming, Lighthearted, Scary, Moving, Tense, Thought-provoking, Uplifting

**Streaming**: Netflix, Hulu, Amazon Prime, HBO Max

## 📦 Recommendations Database

Includes 6 premium films:
- The Prestige (2006)
- Heat (1995)
- Zodiac (2007)
- Inception (2010)
- Pulp Fiction (1994)
- The Dark Knight (2008)

## 🚀 Production Build

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/YourFeature`
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details.

## 💡 Future Ideas

- Real movie database integration (TMDB)
- User ratings and favorites
- Advanced filtering (year, rating, duration)
- Social sharing
- Theme toggle

## 📞 Support

Have questions? Open an issue on GitHub!

---

**Made with ❤️ to help you find your next favorite movie or show**
