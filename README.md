# CodeCracker

**CodeCracker** is a full-stack web application that lets users track their competitive programming progress across platforms like LeetCode and Codeforces. It offers a personalized dashboard, aggregated statistics, a friend leaderboard, and secure user authentication — all with clean UX and informative feedback.

---

## Features

### 🚀 Dashboard Overview

* **LeetCode Integration**

  * Username, global ranking, total solved problems
  * Difficulty distribution pie chart
* **Codeforces Integration**

  * Username, current rating, title
  * Total solved problems
  * Rating vs time contest graph
* Real-time visual feedback and insights

### 🧑‍🤝‍🧑 Friends System

* Add other CodeCracker users as friends
* View a **leaderboard** based on combined problem-solving stats across all platforms

### ➕ Add Platform Handles

* Add LeetCode or Codeforces handles
* View your currently added platforms

### 🔐 Authentication & Security

* JWT-based login system with tokens stored in **HTTP-only cookies**
* **Login and Registration** pages
* Session auto-expiry after 7 days

### ✅ Robust Error Handling

* Custom UI messages for:

  * Server inactive
  * Invalid friend additions
  * Platform username errors
* Loaders and fallback UI during data fetches
* Backend status-aware messaging

---

## Tech Stack

* **Frontend**: React.js, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose)
* **Authentication**: JWT + HTTP-only cookies
* **Hosting**:

  * Frontend: Vercel
  * Backend: Render

---

## Limitations

* No platform-level authentication due to lack of official OAuth or APIs from LeetCode and Codeforces
* Currently supports only LeetCode and Codeforces
* No "unfriend" or "remove platform" feature (by design decision)

---

## Future Improvements (Optional)

* Add support for CodeChef, AtCoder, etc. (if reliable APIs become available)
* Platform-level fallback so one failure doesn't break the entire dashboard
* Improved responsive design and dark mode
* User profile customization

---

## Getting Started (Dev Setup)

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/codecracker.git
   cd codecracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```
   MONGO_URI=your_mongodb_connection
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server**

   ```bash
   cd clinet
   npm run dev

   cd server
   nodemon index.js
   ```

---

## Live Demo

[codecracker-nu.vercel.app](https://codecracker-nu.vercel.app/ "https://codecracker-nu.vercel.app")

---

---

## Author

**Sahil Patel**

* From Ahmedabad, India

---

## License

This project is licensed under the MIT License.
