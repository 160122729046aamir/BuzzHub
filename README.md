# **BuzzHub - Real-Time Chat Application**

BuzzHub is a real-time messaging platform built using the **MERN stack** (MongoDB, Express.js, React, Node.js) and **Socket.io** for live chat functionality. The app includes secure authentication, user management, and a responsive, user-friendly interface.

## **Features**

- **Real-Time Messaging**: Live chat with instant message delivery powered by Socket.io.
- **Secure Authentication**: User authentication using **JWT** (JSON Web Tokens) for secure login and registration.
- **User Status**: Displays users' online/offline status, indicating when they are available to chat.
- **Responsive UI**: Fully responsive interface built with **TailwindCSS** and **DaisyUI** for a modern look and feel.
- **Global State Management**: Efficient state management using **Zustand** for seamless data flow across components.
- **Message Notifications**: Instant notifications for new messages when users are active in different chat rooms.

## **Tech Stack**

- **Frontend**:
  - **React.js** for building the user interface.
  - **TailwindCSS** and **DaisyUI** for styling and creating a responsive design.
  - **Zustand** for global state management.

- **Backend**:
  - **Node.js** and **Express.js** for the server-side logic.
  - **MongoDB** for database management.
  - **Socket.io** for enabling real-time communication.
  - **JWT (JSON Web Tokens)** for secure user authentication.

## **Installation and Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/160122729046aamir/BuzzHub.git
2. Navigate to the project directory:

   ```bash
   cd BuzzHub
3. Install the dependencies and build frontend:

   ```bash
   npm run build
4. Set up environment variables:
   ```bash
    MONGO_URL=<Your_MongoDB_Connection_String>
    PORT=5000
    JWT_SECRET=<Your_Strong_JWT_Secret>
    NODE_ENV=development
    CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
    CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
    CLOUDINARY_API_SECRET=<Your_Cloudinary_API_Secret>
5. Start:
   ```bash
   npm run start
