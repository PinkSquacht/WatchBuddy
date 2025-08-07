# WatchBuddy - Movie Recommendation App

WatchBuddy is a movie and TV show recommendation application that uses OpenAI's ChatGPT to provide personalized recommendations based on your preferences.

## 🚀 Features

- **AI-Powered Recommendations**: Uses OpenAI's ChatGPT-3.5-turbo to generate intelligent movie recommendations
- **Genre & Mood Filtering**: Select up to 6 genres and moods to personalize your recommendations
- **Streaming Service Integration**: Specify your available streaming services (Netflix, Hulu, Amazon Prime, HBO Max)
- **Similarity Analysis**: Get percentage similarity scores and explanations for why movies are recommended
- **Movie Details**: Each recommendation includes runtime, ratings, synopsis, reviews, and IMDB links
- **Responsive Design**: Beautiful, mobile-first UI built with Chakra UI

## 🛠 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up OpenAI API Key

1. Sign up for an OpenAI account at [https://platform.openai.com/](https://platform.openai.com/)
2. Navigate to the API keys section
3. Create a new API key
4. Copy the API key
5. Open the `.env.local` file in the root directory
6. Replace `your_openai_api_key_here` with your actual OpenAI API key:

```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important**: Keep your API key secure and never commit it to version control.

### 3. Run the Development Server
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Enter a Movie/Show**: Type in a movie or TV show title that you enjoyed
2. **Select Preferences**: 
   - Click "Add genre/mood" to select up to 6 genres and moods
   - Click "Add your streaming services" to specify where you watch content
3. **Get Recommendations**: Click "Get Recommendations" to receive AI-powered suggestions
4. **Explore Results**: Browse through recommendations with detailed information and similarity explanations

## 🏗 Technical Details

### Architecture
- **Frontend**: Next.js with React 18
- **UI Framework**: Chakra UI
- **AI Integration**: OpenAI ChatGPT-3.5-turbo API
- **Styling**: Custom theme with dark green color scheme

### API Structure
The application includes a local API endpoint (`/api/recommendations`) that:
1. Processes user preferences (movie, genres, streaming services)
2. Constructs intelligent prompts for ChatGPT
3. Parses and structures the AI responses
4. Returns formatted recommendations with fallback mock data

### Key Components
- **`pages/index.jsx`**: Main recommendation interface
- **`pages/recommendations.jsx`**: Results display page  
- **`pages/api/recommendations.js`**: Local ChatGPT integration API
- **`components/SelectionButton.js`**: Reusable selection component
- **`styles/theme.js`**: Custom Chakra UI theme

## 🔧 Configuration

### Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key (required)

### Customization
- Modify `styles/theme.js` to change the app's appearance
- Update the streaming services list in `pages/index.jsx`
- Adjust the genres and moods in the `genresAndMoods` array

## 📝 Development Notes

This application was originally designed to work with an external Flask API but has been converted to use a local JavaScript implementation that replicates the original Flask functionality exactly. The local API:

- Uses the same prompt structure as the original Flask implementation
- Includes identical field extraction logic
- Maintains the same recommendation format and structure
- Provides fallback mock data when the AI API is unavailable

## 🚨 Important Notes

- **API Costs**: This app uses OpenAI's paid API. Monitor your usage to avoid unexpected charges
- **Rate Limits**: Be aware of OpenAI's rate limits for your API tier
- **Security**: Never expose your OpenAI API key in client-side code

## 🎬 Example Flow

1. User enters "The Dark Knight"
2. Selects "Action", "Thriller" genres
3. Chooses "Netflix", "HBO Max" streaming services  
4. Receives 3 AI-generated recommendations with similarity scores, detailed descriptions, and viewing information

## 🔄 Fallback System

If the OpenAI API is unavailable, the application automatically provides mock recommendations to ensure the user experience remains uninterrupted.

---

**Enjoy discovering your next favorite movie or show with WatchBuddy! 🍿**
