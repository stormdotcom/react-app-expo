# Todo App

A simple and clean todo application built with React Native and Expo.

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Clean, modern UI
- ✅ Cross-platform (iOS, Android, Web)

## Tech Stack

- **Frontend**: React Native 0.79.5
- **Navigation**: Expo Router
- **Icons**: Expo Vector Icons
- **Language**: TypeScript
- **Platform**: Expo SDK 53

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your preferred platform:
   - **iOS**: `npm run ios`
   - **Android**: `npm run android`
   - **Web**: `npm run web`

## Project Structure

```
app/
├── _layout.tsx          # Root layout
├── (tabs)/
│   ├── _layout.tsx      # Tab navigation
│   ├── index.tsx        # Todo list screen
│   └── explore.tsx      # Settings screen
└── +not-found.tsx       # 404 page
```

## Development

The app follows a clean, minimal structure with:
- File-based routing using Expo Router
- Tab-based navigation
- Modern React Native patterns
- TypeScript for type safety

## License

MIT
