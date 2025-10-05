# 🚀 TypeRush - MERN Typing Speed Test

A full-stack, feature-rich typing speed test application built with the MERN stack (MongoDB, Express, React, Node.js). This project allows users to practice their typing skills, track their progress over time with interactive charts, and compete on a global leaderboard.

**Live Demo:** [https://type-rush.vercel.app/](https://type-rush.vercel.app/)



---

### Key Features

-   **Multiple Test Modes:** Choose between timed tests (e.g., 30s, 60s) for varied practice sessions.
-   **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
-   **Personalized Dashboard:** Track your WPM and accuracy history with an interactive progress chart.
-   **Global Leaderboard:** See how you stack up against other players for different test modes.
-   **Real-time Feedback:** Characters are highlighted as correct or incorrect instantly as you type.
-   **Dark/Light Mode:** A sleek, user-selectable theme for comfortable viewing, with preferences saved to local storage.
-   **Responsive Design:** Fully functional and visually appealing on both desktop and mobile devices.

---

### Tech Stack

| Category       | Technology                                                             |
| :------------- | :--------------------------------------------------------------------- |
| **Frontend**   | React, Redux Toolkit, React Router, Chart.js, Axios, Styled-Components |
| **Backend**    | Node.js, Express.js                                                    |
| **Database**   | MongoDB with Mongoose                                                  |
| **Auth**       | JSON Web Tokens (JWT), bcryptjs                                        |
| **Deployment** | Vercel                                                                 |

---

### Environment Variables

To run this project locally, you will need to create a `.env` file in the `/server` directory and add the following environment variables:

`MONGO_URI=` (Your MongoDB connection string)
`JWT_SECRET=` (A long, random secret key for JWT)
`PORT=5020` (The port for the backend server)

---

### Local Development Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/thistooshallpasss/TypeRush.git](https://github.com/thistooshallpasss/TypeRush.git)
    cd TypeRush
    ```

2.  **Setup Backend:**
    ```bash
    cd server
    npm install
    # Create the .env file as described above
    npm run dev
    ```

3.  **Setup Frontend (in a new terminal):**
    ```bash
    cd client
    npm install
    npm start
    ```
The application will be available at `http://localhost:3000`.