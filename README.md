# 🎬 ScreenKeep

ScreenKeep is a web application for exploring and searching a collection of movies. Built with a modern tech stack, it delivers a smooth and intuitive experience for movie enthusiasts.

## 🔑 Key Features

- **Browse All Movies**: Explore a diverse collection of movies available on the platform.  
- **Search Movies**: Quickly find specific movies using the search feature.  
- **Trending Movies**: View trending movies based on an up-to-date algorithm.  
- **Modern UI/UX**: Enjoy a sleek, intuitive interface for a seamless experience.  
- **Responsive Design**: Optimized for all devices, providing a smooth user experience across screens.  
- **Code Quality & Reusability**: Built with maintainable and reusable code architecture.

## ⚙️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend & Database:** Appwrite  
- **API:** [The Movie Database (TMDB)](https://www.themoviedb.org/)  

## ⚡ Setup Environment Variables

This project requires API keys for **TMDB** and **Appwrite**. Since `.env.local` is not included, you'll need to create it manually.

1. **Create a `.env.local` file**  
   Run the following command in the project root:  
   ```sh
   touch .env.local
   ```


2. **Add the required environment variables**  
   Add the following to `.env.local` and replace the placeholders with your actual values:

   ```ini
   # TMDB API Key
   VITE_TMDB_API_KEY=your_actual_api_key_here

   # Appwrite Project Keys
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id_here
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id_here
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id_here
   ```
