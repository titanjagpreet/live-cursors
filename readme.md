# Live Cursors App

A real-time collaborative application that allows multiple users to see each other's mouse cursors in real-time. Built with WebSocket for instant communication and smooth cursor animations.

## Features

- 🖱️ **Real-time cursor tracking** - See other users' cursors move in real-time
- 👥 **Multi-user support** - Multiple users can join and interact simultaneously
- ✨ **Smooth animations** - Powered by perfect-cursors for fluid cursor movements
- 🚀 **Low latency** - WebSocket-based communication for instant updates
- 🎨 **Modern UI** - Clean and intuitive React interface

## Tech Stack

### Server
- **Node.js** - Runtime environment
- **WebSocket (ws)** - Real-time bidirectional communication
- **UUID** - Unique user identification

### Client
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **perfect-cursors** - Smooth cursor interpolation
- **react-use-websocket** - WebSocket React hook

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd live-cursors-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

## Usage

### Start the Server

```bash
cd server
npm start
```

The WebSocket server will start on `ws://localhost:8000`

### Start the Client

In a new terminal:

```bash
cd client
npm run dev
```

The client will be available at `http://localhost:5173` (or the port shown in the terminal)

### How to Use

1. Open the application in your browser
2. Enter a username when prompted
3. Move your mouse to see your cursor position
4. Open the app in multiple browser tabs/windows with different usernames to see other users' cursors in real-time

## Project Structure

```
live-cursors-app/
├── server/
│   ├── index.js          # WebSocket server implementation
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.tsx      # Main application component
│   │   │   ├── Login.tsx     # Username input component
│   │   │   └── Cursor.tsx    # Cursor rendering component
│   │   ├── hooks/
│   │   │   └── userPerfectCursor.ts  # Cursor animation hook
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── readme.md
```

## Testing with Postman

You can test the WebSocket server directly using Postman:

1. **Create a new WebSocket request** in Postman
2. **Connect to**: `ws://localhost:8000?username=YourName`
3. **Send messages** in JSON format:
   ```json
   {
     "x": 100,
     "y": 200
   }
   ```
4. The server will broadcast the cursor position to all connected clients

## Development

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Server Scripts
- `npm start` - Start the WebSocket server

## How It Works

1. **Connection**: Users connect via WebSocket with a username query parameter
2. **Identification**: Each user receives a unique UUID upon connection
3. **Cursor Tracking**: Mouse movements are throttled and sent to the server
4. **Broadcasting**: The server broadcasts all user states to all connected clients
5. **Rendering**: The client renders cursors using smooth interpolation for natural movement

## License

ISC

