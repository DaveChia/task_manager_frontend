# Simple Task Management Frontend Web App build with Vue, Vite and Docker

This is a template README file for a simple task management application for the customer
service operations department.

The application should allow users to add a new task, view all tasks, and mark a task as completed.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

1. Node.js and npm installed on your machine.
2. Docker installed on your machine.

### Installation

1. Clone this repository to your local machine:

```
git clone https://github.com/DaveChia/task_manager_frontend.git
cd task_manager_frontend
```

2. Install the project dependencies

```
npm install
```

3. Set up the .env, copy .env.example into .env

   - VITE_API_KEY=yoursecretapikey // This is the api key required by the backend API server to authorize api calls
   - VITE_API_URL=http://localhost:3000 // This is the url of the backend API server to call

4. Build the Docker Container

```
docker build -t your-vue-app .
```

5. Run the Docker Container

```
docker run -p 8081:5173 your-vue-app   // Change the ports if needed
```

This will start the Docker container, and app will be accessible at http://localhost:8081.
