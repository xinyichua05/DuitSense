# DuitSense

DuitSense is an AI-powered financial literacy and expense management platform designed for young adults in Malaysia. It combines personalized AI coaching with gamification to make financial management engaging, educational, and rewarding. Users build healthy spending habits through interactive challenges, track their financial journey with intelligent projections, and compete with friends on a real-time leaderboard.

## 🚀 Key Features

**AI-Powered Personalization**

- Persona-based financial classification (8 archetypes: Saver, Spender, Investor, Debtor, Planner, ImpulseBuyer, Traditionalist, Modernist)
- AI-generated challenges tailored to spending patterns and financial goals
- Behavior analysis with cognitive bias detection and recommendations
- Festival-specific budget planning powered by Gemini AI

**Gamification & Engagement**

- 7-day streak system with XP multipliers (up to 2x XP at day 7)
- Daily financial literacy quizzes with instant feedback and explanations
- Challenge completion tracking with adaptive difficulty
- Spin-the-wheel reward system with vouchers, TnG reloads, and XP boosters

**Financial Analytics**

- Real-time expense tracking by category with peer comparison
- Dual-trajectory financial projections (current vs improved path)
- EPF (Employee Provident Fund) calculator with retirement projections
- ROI simulation and savings impact analysis
- Monthly behavior insights with actionable recommendations

**Social & Competition**

- Friends leaderboard with weekly XP rankings
- Squad achievement system for team-based financial goals
- Peer comparison by age bracket for spending benchmarking
- Weekly rewards for top 3 performers

**Educational Content**

- Malaysian-focused financial quiz (PIDM protection, compound interest, good vs bad debt)
- Budget framework education (50/30/20 rule)
- Festival financial planning guides

## 🧱 Architecture Overview

### Backend (`/backend`)

- **Express.js Server**: RESTful API for all financial and gamification services
- **AI Personalization** (`/backend/ai_personalisation`): Persona classification, challenge generation, behavior analysis
- **Data Integration** (`/backend/data_integration`): Database, Redis caching, peer comparison engine, Gemini AI client
- **Projection & Rewards** (`/backend/projection_reward`): EPF calculator, financial projections, streak system, spin wheel engine
- **Controllers**: Expense, challenge, insight, projection, and leaderboard management
- **Background Jobs**: Weekly leaderboard reset and festive mode scheduling (node-cron)

### Frontend (`/frontend`)

- **React Native + Expo**: iOS/Android mobile app with web support
- **Expo Router**: File-based navigation
- **Tailwind CSS & NativeWind**: Responsive design system
- **Reanimated Animations**: Smooth, performant UI transitions
- **Charts**: Real-time financial visualization with react-native-chart-kit

### Key Integrations

- **Gemini AI**: Advanced natural language processing for personalized insights
- **Redis Cache**: High-speed caching for insights and user data
- **PostgreSQL**: Relational database for user profiles, expenses, challenges
- **Node-cron**: Scheduled background jobs for daily/weekly tasks

## ⚙️ Prerequisites

- **Node.js 18+** / npm
- **Python 3.8+** (optional, for backend data processing)
- **.env file** with:
  - `GEMINI_API_KEY`: Google Gemini API key
  - `DATABASE_URL`: PostgreSQL connection string
  - `REDIS_URL`: Redis server URL
  - `PORT`: Backend server port (default 5000)

## 🧩 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/duitsense
REDIS_URL=redis://localhost:6379
PORT=5000
```

Start the backend server:

```bash
node server.js
```

The API will be available at: `http://localhost:5000`

**Available API Endpoints:**

- `GET/POST /api/expenses` - Create and retrieve expenses
- `GET /api/expenses/peer-compare` - Peer comparison data
- `POST /api/challenges/generate` - Generate AI challenges
- `PATCH /api/challenges/:id/complete` - Complete challenges
- `GET /api/insights/monthly` - Monthly behavior insights
- `GET /api/projection` - Financial projections
- `GET /api/leaderboard` - Friends leaderboard
- `POST /api/leaderboard/spin` - Spin the wheel

## 🖥 Frontend Setup

```bash
cd frontend
npm install
npm run web
```

or for mobile:

```bash
npm run ios      # iOS simulator
npm run android  # Android emulator
npm start        # Expo Go
```

The React UI will be served at: `http://localhost:5173` (web) or accessible via Expo Go

## 📊 Using DuitSense

1. **Onboarding**: Complete financial personality quiz (5 questions)
2. **Dashboard**: View current expenses, streak status, and XP progress
3. **Expense Logging**: Quick-add expenses with category and notes
4. **AI Challenges**: Complete personalized micro-challenges to earn XP
5. **Quiz Daily**: Answer financial literacy questions for bonus XP
6. **Projections**: Simulate savings impact on long-term wealth (age 65)
7. **Leaderboard**: Compete with friends weekly; top 3 earn bonus spins
8. **Rewards**: Spin the wheel to win vouchers, TnG reloads, or XP boosters
9. **Insights**: Review monthly behavior analysis and peer benchmarking

## 📱 Project Structure

```
DuitSense/
├── backend/                          # Express.js API server
│   ├── ai_personalisation/           # AI persona & challenge generation
│   ├── controllers/                  # Route handlers
│   ├── data_integration/             # DB, cache, Gemini client
│   ├── middleware/                   # Auth, error handling
│   ├── projection_reward/            # Financial analysis & gamification
│   ├── routes/                       # API endpoints
│   ├── services/                     # Business logic
│   └── server.js                     # Entry point
├── frontend/                         # React Native + Expo app
│   ├── app/                          # Screen components
│   ├── components/                   # Reusable UI components
│   ├── hooks/                        # Custom React hooks
│   ├── constants/                    # Theme, config
│   └── web_src/                      # Web build source
├── components/                       # Shared UI components
├── hooks/                            # Shared hooks
├── constants/                        # App-wide constants
└── app.json                          # Expo config
```

## 🔐 Authentication

Currently using mock authentication via headers. To integrate real auth:

- Set `X-Mock-User-Id` header for user identification
- Replace `/backend/middleware/mockAuth.js` with real JWT/OAuth implementation

## 📝 Environment Configuration

Key environment variables:

| Variable         | Purpose               | Example                            |
| ---------------- | --------------------- | ---------------------------------- |
| `GEMINI_API_KEY` | AI model access       | `AIzaSy...`                        |
| `DATABASE_URL`   | PostgreSQL connection | `postgresql://localhost/duitsense` |
| `REDIS_URL`      | Cache layer           | `redis://localhost:6379`           |
| `PORT`           | Backend port          | `5000`                             |

## 🚀 Deployment

**Backend:**

- Deploy to Heroku, Railway, or Render
- Ensure PostgreSQL and Redis services are available
- Set environment variables in deployment platform

**Frontend:**

- Web: `npm run build` then deploy to Vercel, Netlify, or AWS S3
- Mobile: Use Expo Application Services (EAS) for iOS/Android builds

## 🛣️ Roadmap

- [ ] Real OAuth2 authentication
- [ ] Multi-friend squad system
- [ ] Push notifications for streak reminders
- [ ] Merchant integration for real transactions
- [ ] Advanced reporting and tax insights
- [ ] Financial goal tracking
- [ ] Automated bill tracking and payment reminders

## 📄 License

This project is proprietary. All rights reserved.

## 🤝 Contributing

For contributors, please follow the existing code style and submit pull requests with clear descriptions.
