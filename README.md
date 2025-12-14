# Tower Defense Game

A classic tower defense game built with HTML5 Canvas and JavaScript.

## 🎮 Play Online

[Play Now](#) *(add your Railway URL here after deployment)*

## 🚀 Deploy on Railway

### Option 1: One-Click Deploy (Recommended)

1. Fork this repository to your GitHub account
2. Go to [Railway](https://railway.app/)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your forked repository
6. Railway will auto-detect the Dockerfile and deploy
7. Click **"Generate Domain"** in Settings to get your public URL

### Option 2: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize and deploy
railway init
railway up
```

### Option 3: Docker Hub

```bash
# Build the image
docker build -t tower-defense-game .

# Run locally (test before deploy)
docker run -p 8080:80 tower-defense-game

# Open http://localhost:8080 in your browser
```

## 🛠️ Local Development

### Using Python (Simple)
```bash
python -m http.server 8080
```

### Using Node.js
```bash
npx serve .
```

### Using Docker
```bash
docker build -t tower-defense-game .
docker run -p 8080:80 tower-defense-game
```

Then open `http://localhost:8080` in your browser.

## 📁 Project Structure

```
tower-defense-game/
├── index.html          # Main game file
├── js/                 # JavaScript game logic
│   ├── main.js         # Entry point
│   ├── Tower.js        # Tower mechanics
│   ├── Enemy.js        # Enemy AI
│   ├── Level.js        # Level management
│   └── ...
├── images/             # Game assets
├── sounds/             # Audio files
├── Dockerfile          # Docker/Railway config
└── nginx.conf          # Web server config
```

## 🎯 How to Play

1. **Build Towers**: Click on available spots to place defensive towers
2. **Upgrade**: Improve your towers to deal more damage
3. **Survive**: Stop enemies from reaching your base
4. **Earn Coins**: Defeating enemies gives you coins for more towers

## ⚙️ Railway Configuration

Railway auto-detects the `Dockerfile` and handles:
- ✅ Build process
- ✅ Port binding (uses PORT env variable or defaults to 80)
- ✅ SSL/HTTPS (automatic with Railway domains)
- ✅ CDN and caching

### Environment Variables (Optional)

No environment variables required. The game is fully static.

## 📝 License

See [LICENSE](LICENSE) file.

