# SnapChef - Snap a Photo, Find a Recipe

## Overview

SnapChef is an innovative React application that uses AI to analyze photos of food ingredients and suggest personalized recipes. Simply take a photo of the ingredients you have on hand, and SnapChef will provide you with delicious recipe options tailored to your dietary preferences and available ingredients.

## Features

- 📸 **Ingredient Recognition** - AI-powered identification of food ingredients from photos
- 🍳 **Personalized Recipes** - Recipe suggestions based on your ingredients and preferences
- 🥗 **Dietary Customization** - Filter recipes by dietary restrictions and allergies
- 📱 **Mobile-Friendly Design** - Optimized for use on mobile devices for on-the-go recipe finding
- 🔍 **Smart Search** - Find recipes even with partial ingredients
- 📊 **Ingredient Substitution** - Suggestions for ingredient alternatives

## Technology Stack

- ⚡️ **Vite** - Lightning fast build tool that serves code via native ES modules
- ⚛️ **React 18** - Latest version of React with improved rendering and better performance
- 🔷 **TypeScript** - Enhanced developer experience with static typing
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 🧭 **React Router** - Client-side routing with React Router v6
- 🤖 **Image Recognition API** - AI-powered ingredient detection

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone this repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run dev-host` - Starts the development server accessible on your local network
- `npm run build` - Creates an optimized production build
- `npm run preview` - Previews the production build locally

## Project Structure

```
├── src/
│   ├── assets/        # Static assets and images
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API services including AI image analysis
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main App component
│   ├── Router.tsx     # Route definitions
│   └── main.tsx       # Application entry point
├── public/            # Public static files
├── index.html         # HTML template
└── package.json       # Project dependencies and scripts
```

## How It Works

1. **Capture or Upload** - Take a photo with your device camera or upload an existing image
2. **AI Analysis** - Our image recognition algorithm identifies ingredients in your photo
3. **Recipe Matching** - The app matches your ingredients with our recipe database
4. **Personalization** - Recipes are filtered based on your dietary preferences
5. **Recipe Display** - Browse through suggested recipes and select one to view detailed instructions

## Future Enhancements

- Meal planning calendar integration
- Grocery list generation for missing ingredients
- Community recipe sharing
- Voice command support
