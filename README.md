# Placement Predictor — Frontend

A modern React web app that predicts student job placement likelihood using IQ score and CGPA. Users enter their details, submit the form, and see an animated result popup powered by a machine learning backend.

## Live Demo

**Frontend:** [https://ml-first-python-project.vercel.app](https://ml-first-python-project.vercel.app)

**Backend API:** [https://ml-first-python-project-backend-1.onrender.com](https://ml-first-python-project-backend-1.onrender.com)

## Features

- Clean, responsive UI with glassmorphism design
- Real-time placement prediction via REST API
- Loading states and error handling
- Result popup with success/failure styling
- Mobile-friendly layout

## Tech Stack

- **React 19** — UI library
- **Vite** — build tool & dev server
- **Tailwind CSS v4** — styling
- **Axios** — HTTP client for API requests
- **ESLint** — code linting

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx          # Main application & prediction form
│   ├── main.jsx         # React entry point
│   ├── index.css        # Tailwind CSS import
│   └── assets/          # Static assets
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-frontend-repo-url>
cd frontend

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

Output is written to the `dist/` folder.

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## How It Works

1. User enters **IQ score** and **CGPA** (0–4).
2. On submit, the app sends a `POST` request to `/predict` on the backend.
3. The API returns a prediction (`0` or `1`) and a message.
4. A modal popup displays the result with color-coded feedback.

**API request example:**
```json
POST /predict
{
  "iq": 120,
  "cgpa": 3.5
}
```

**API response example:**
```json
{
  "prediction": 1,
  "result": "Likely to get placement"
}
```

## Configuration

The backend URL is currently set in `src/App.jsx`:

```js
"https://ml-first-python-project-backend-1.onrender.com/predict"
```

For local development against a local backend, change this to:

```js
"http://127.0.0.1:5000/predict"
```

**Tip:** Use an environment variable (e.g. `VITE_API_URL`) so you don't need to edit source code per environment.

## Deployment

This frontend is deployed on [Vercel](https://vercel.com).

**Build command:** `npm run build`  
**Output directory:** `dist`

## Related Repository

- **Backend API:** [ML-First-python-project-backend](https://github.com/Maruf3088/ML-First-python-project-backend)

## Author

**Maruf Islam** — [GitHub](https://github.com/Maruf3088)

## License

This project is open source and available for learning purposes.
