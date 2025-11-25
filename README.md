# PokéTeam - Pokémon Team Builder

A modern React application for building and managing your perfect Pokémon team.

## Features

- 📚 **Pokédex**: Browse and search through all Pokémon
- 🎯 **Capture System**: Catch and collect your favorite Pokémon
- 👥 **Team Builder**: Build teams of up to 6 Pokémon
- ⚔️ **Comparison Tool**: Compare stats and type matchups
- 📊 **Team Analysis**: Get insights on your team composition
- 🏆 **Achievements**: Unlock badges as you progress
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 💾 **Data Persistence**: Save your progress with Supabase or localStorage

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Supabase** - Backend & Authentication
- **PokeAPI** - Pokémon data
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd poketeam-app
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory

```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

The build files will be in the `dist` directory.

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # React components
│   ├── auth/       # Authentication components
│   ├── common/     # Shared components
│   ├── pokemon/    # Pokémon-related components
│   ├── team/       # Team building components
│   └── profile/    # User profile components
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API services
├── styles/         # CSS files
├── utils/          # Utility functions
├── App.jsx         # Main App component
└── main.jsx        # Entry point
```

## Features Overview

### Authentication

- Email/password registration and login
- Protected routes
- User profiles

### Pokédex

- Browse all Pokémon
- Search by name or ID
- Filter by type
- View detailed stats

### Team Builder

- Add up to 6 Pokémon to your team
- Analyze team composition
- View type coverage and weaknesses
- Save teams to your account

### Comparison

- Compare two Pokémon side-by-side
- View stat differences
- Analyze type matchups

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is for educational purposes. Pokémon and Pokémon character names are trademarks of Nintendo.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for the Pokémon data
- [Supabase](https://supabase.com/) for backend services
- The Pokémon community
