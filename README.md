# Eyebook

**Eyebook** is a social media platform focused on pet care and stories, offering users a unique space to share, connect, and engage with pet lovers worldwide. Inspired by the core functionalities of a traditional social media site (like Facebook), Eyebook provides a place for users to interact through posts, follow others, and keep track of their favorite pet stories.

### Live URL

[Live URL](https://eyebook.vercel.app "Visit the live application")

# Admin Credentials

To log in as an admin, use the following credentials:

- **Email**: `eyebook-admin@gmail.com`
- **Password**: `password`

```json
{
  "email": "eyebook-admin@gmail.com",
  "password": "password"
}
```

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Best Practices](#best-practices)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [Contributing](#contributing)

## Project Overview

Eyebook enables users to create profiles, share posts, and engage with a community that revolves around pet care and storytelling. Whether it's sharing tips on pet grooming, documenting daily adventures with pets, or discussing pet-related issues, Eyebook connects pet lovers in a meaningful way.

## Features

Eyebook is packed with modern social media functionalities, designed with pets in mind:

- **User Authentication**: Users can register, sign in, and create profiles. Authentication ensures secure access to user data.
- **Posts and Stories**: Users can share posts (images, videos, and text) related to their pets. Each post can be liked, commented on, and shared by other users.
- **Followers and Following**: Users can follow each other to keep up with the latest pet stories and updates from their favorite users.
- **User Profiles**: In addition to user profiles, Eyebook allows users to create profiles for their pets, showcasing their adventures and milestones.
- **Story Feed**: A live feed that highlights stories and posts from followed users or trending pet-related content.
- **Search and Filtering**: Users can search for pet stories by categories such as pet species, activities, or health topics.
- **User Roles**: Admin users have additional permissions for managing content, users, and resolving disputes on the platform.
- **Notifications**: Users get notified when they receive likes, comments, or new followers.
- **Mobile Responsive**: Eyebook is optimized for mobile devices, ensuring a seamless experience on all screens.

## Technologies Used

Eyebook utilizes a modern tech stack to ensure scalability, security, and responsiveness:

- **Frontend**:

  - [Next.js](https://nextjs.org/) - for server-side rendering and a fast, responsive interface
  - [React](https://reactjs.org/) - for building dynamic user interfaces
  - [Material-UI](https://mui.com/) - for pre-designed components and responsive layouts
  - [Tailwind CSS](https://tailwindcss.com/) - for utility-first styling
  - **Redux Toolkit** - for state management
  - **TypeScript** - for type safety and better developer experience

- **Backend**:

  - [Node.js](https://nodejs.org/) - for building the server
  - [Express](https://expressjs.com/) - as the web framework for handling routes and APIs
  - [Mongoose](https://mongoosejs.com/) - for interacting with MongoDB
  - [MongoDB](https://www.mongodb.com/) - for the database to store user and post data
  - **JWT** - for secure user authentication

- **API Integration**:

  - **RESTful API** - for structured communication between the frontend and backend

## Best Practices

Eyebook follows industry best practices for both frontend and backend development to ensure code quality, scalability, and security:

### 1. **Separation of Concerns**

- The project uses a modular architecture, separating business logic into controllers, services, and models, ensuring that the app is easy to maintain and scale.

### 2. **State Management with Redux Toolkit**

- Redux Toolkit is used for efficient state management, reducing boilerplate code, and ensuring global state consistency across the app.

### 3. **Type Safety with TypeScript**

- TypeScript is used throughout the project to prevent type errors and provide a better developer experience, enhancing code readability and reducing bugs.

### 4. **Responsive Design**

- Eyebook is fully responsive, utilizing Tailwind CSS and Material-UI for adaptive layouts, ensuring a smooth experience on mobile, tablet, and desktop devices.

### 5. **User Authentication and Security**

- JWT (JSON Web Tokens) is used for secure authentication, ensuring that sensitive user data is protected. Passwords are hashed and sensitive operations are protected with middleware.

### 6. **Error Handling**

- Proper error handling mechanisms have been implemented in both frontend and backend, with descriptive error messages and fallback UI for improved user experience.

### 7. **Performance Optimization**

- Lazy loading, pagination in Next.js help optimize performance and reduce load times.

### 8. **Version Control and Meaningful Commits**

- Follows Git best practices with frequent and meaningful commits, making it easy to track changes and revert if needed.

## Installation Guide

To run Eyebook locally, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jayed-islam/pet-care-tips-and-stories-frontend
   cd pet-care-tips-and-stories-frontend
    npm install
   npm run dev
   ```

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file.
   Example:
   ```bash
    VITE_SERVER_API=backend-uri
   ```

## Usage

To use the project effectively, follow these instructions:

1. **Start the backend server:**

   Ensure MongoDB is running and start the backend server using the following command:

   ```bash
   npm run start:dev   # or yarn start:dev
   ```

2. **Start the frontend development server:**

   Open a new terminal window, navigate to the project directory, and start the frontend development server:

   ```bash
   npm run dev
   ```
