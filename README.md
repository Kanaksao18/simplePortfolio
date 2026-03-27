# Kanak Portfolio

A premium, recruiter-focused portfolio website with a static Tailwind frontend and a Node.js + Express backend for contact form email delivery.

## Folder Structure

```text
simplePortfolio/
|-- frontend/
|   |-- assets/
|   |   |-- Kanak-Resume.pdf
|   |   |-- cert-android.svg
|   |   |-- cert-backend.svg
|   |   |-- cert-java.svg
|   |   `-- profile-portrait.svg
|   |-- js/
|   |   |-- config.example.js
|   |   |-- config.js
|   |   `-- main.js
|   `-- index.html
|-- backend/
|   |-- .env.example
|   |-- package.json
|   |-- render.yaml
|   `-- server.js
|-- .gitignore
`-- README.md
```

## Frontend Features

- Fully responsive landing page with dark navy styling and cyan accents
- Sticky navigation with active-section highlighting
- Smooth scroll behavior and AOS scroll animations
- Recruiter-focused sections for hero, about, projects, certifications, and contact
- Glassmorphism project and certification cards
- Working contact form integration through `fetch()`

## Backend Features

- Express server with `POST /send-email`
- Input validation for name, email, and message
- Nodemailer support for Gmail app passwords or custom SMTP
- CORS configuration for frontend origin
- `GET /health` endpoint for deployment checks

## Local Setup

### 1. Frontend

Open [frontend/index.html](/D:/marathon/simplePortfolio/frontend/index.html) with a static server or the VS Code Live Server extension.

Before deploying, update [frontend/js/config.js](/D:/marathon/simplePortfolio/frontend/js/config.js) with your backend URL.

### 2. Backend

```bash
cd backend
npm install
copy .env.example .env
```

Fill in the values inside `.env`:

```env
PORT=5000
FRONTEND_URL=http://127.0.0.1:5500
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-email@gmail.com
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_FROM="Kanak Portfolio <your-email@gmail.com>"
```

Run the backend:

```bash
npm run dev
```

## Gmail Setup

- Use a Gmail account with 2-Step Verification enabled.
- Create an App Password in Google Account security settings.
- Put the Gmail address in `EMAIL_USER`.
- Put the App Password in `EMAIL_PASS`.

## Deployment Steps

### GitHub

1. Initialize Git in the project root.
2. Commit the files and push the repository to GitHub.

### Vercel Frontend

1. Import the repository into Vercel.
2. Set the Vercel project root directory to `frontend`.
3. Deploy the static site.
4. After your backend is live, update [frontend/js/config.js](/D:/marathon/simplePortfolio/frontend/js/config.js) to the backend URL and redeploy.

### Render Backend

1. Create a new Web Service from the same GitHub repository.
2. Set the root directory to `backend`.
3. Use `npm install` as the build command and `npm start` as the start command.
4. Add the environment variables from [backend/.env.example](/D:/marathon/simplePortfolio/backend/.env.example).
5. Set `FRONTEND_URL` to your deployed Vercel domain.
6. Test the health route at `https://your-service.onrender.com/health`, then submit the contact form.

### Railway Backend

1. Create a new project from your GitHub repository.
2. Set the service root to `backend`.
3. Add the same environment variables used above.
4. Deploy and copy the generated service URL.
5. Update [frontend/js/config.js](/D:/marathon/simplePortfolio/frontend/js/config.js) with that backend URL and redeploy the frontend if needed.

## Personalization Checklist

- Replace the placeholder GitHub, LinkedIn, project links, and demo URLs in [frontend/index.html](/D:/marathon/simplePortfolio/frontend/index.html).
- Swap the placeholder certificate SVGs with actual certificate images.
- Replace the placeholder resume at [frontend/assets/Kanak-Resume.pdf](/D:/marathon/simplePortfolio/frontend/assets/Kanak-Resume.pdf).
- Update the contact email address shown in [frontend/index.html](/D:/marathon/simplePortfolio/frontend/index.html).
