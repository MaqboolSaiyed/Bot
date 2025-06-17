# 🤖 Voice Assistant - AI Chat Bot

A modern, voice-enabled AI chatbot with a beautiful glass morphism UI that simulates ChatGPT's personality with personal responses about Maqbool Husain Saiyed's background, skills, and experiences.

## ✨ Features

- **🎤 Voice Input/Output**: Natural voice conversations using Web Speech API
- **🎨 Modern UI**: Beautiful glass morphism design with smooth animations
- **🧠 AI-Powered**: OpenAI API integration for intelligent responses
- **📱 Responsive**: Works perfectly on desktop and mobile devices
- **🔒 Secure**: Environment variables for API keys and sensitive data
- **🎯 Personal**: Predefined responses about background, achievements, and experiences
- **⚡ Fast**: Optimized for low latency and smooth interactions

## 🚀 Live Demo

[Deployed on Vercel](https://your-app-name.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, CSS3
- **Backend**: Node.js, Express.js
- **AI**: OpenAI GPT-3.5 Turbo API
- **Voice**: Web Speech API (Speech Recognition & Synthesis)
- **Deployment**: Vercel
- **Styling**: Custom CSS with Glass Morphism

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/voice-chat-bot.git
   cd voice-chat-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   This will start both the React frontend (port 3000) and the Express backend (port 3001).

## 🎯 Usage

1. **Voice Mode**: Click the microphone button and speak your question
2. **Text Mode**: Type your question if voice recognition fails
3. **Sample Questions**:
   - "Tell me about your background"
   - "What are your interests?"
   - "What are your achievements?"
   - "How are you doing?"
   - "What's your life story?"

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `OPENAI_API_KEY`: Your OpenAI API key

3. **Deploy**
   - Vercel will automatically detect the configuration
   - Click "Deploy"
   - Your app will be live at `https://your-app-name.vercel.app`

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `OPENAI_API_KEY`: Your OpenAI API key
- `NODE_ENV`: production

## 🎨 Customization

### Personal Responses
Edit `server/server.js` to modify the predefined responses in the `botResponses` array.

### UI Styling
- Main styles: `src/App.css`
- Component styles: `src/styles/ChatInterface.css`

### Voice Settings
Modify voice selection in `src/hooks/useTextToSpeech.ts`

## 🔧 Development

### Project Structure
```
voice-chat-bot/
├── public/                 # Static files
├── src/                   # React source code
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # CSS files
│   └── types/            # TypeScript types
├── server/               # Backend server
│   └── server.js         # Express server
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies and scripts
```

### Available Scripts
- `npm start`: Start React development server
- `npm run server`: Start Express backend server
- `npm run dev`: Start both frontend and backend
- `npm run build`: Build for production
- `npm test`: Run tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Maqbool Husain Saiyed**
- MCA in AI/ML at Jain University, Bangalore
- Passionate about AI/ML and creating impactful solutions
- Specializes in machine learning, voice AI, and full-stack development

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Web Speech API for voice capabilities
- React team for the amazing framework
- Vercel for seamless deployment

---

⭐ **Star this repository if you found it helpful!**
