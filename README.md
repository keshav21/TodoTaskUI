
# TodoTaskUI

TodoTaskUI is a simple React-based user interface for managing todo tasks. It provides a clean and intuitive interface for users to add, view, update, and delete tasks.

## Features

- Add new tasks with titles, descriptions, due dates, priorities, and statuses.
- View all tasks in a list with filtering and sorting options.
- Update task details or mark tasks as complete/incomplete.
- Delete tasks individually or in bulk.
- Supports recurring tasks with customizable recurrence patterns.

## Deployment Steps

Follow these steps to deploy TodoTaskUI in your Kubernetes cluster:

1. **Build Docker Image:**

   Build the Docker image for TodoTaskUI using the provided Dockerfile:

   ```sh
   docker build -t your-docker-registry/todotaskui:latest .
   ```

2. **Push Docker Image:**

   Push the Docker image to your Docker registry (e.g., Docker Hub, Google Container Registry):

   ```sh
   docker push your-docker-registry/todotaskui:latest
   ```

3. **Kubernetes Deployment:**

   Apply the Kubernetes deployment YAML to deploy TodoTaskUI with 3 replicas:

   ```sh
   kubectl apply -f kubernetes-deployment.yaml
   ```

4. **Kubernetes Service:**

   Apply the Kubernetes service YAML to expose TodoTaskUI within the cluster:

   ```sh
   kubectl apply -f kubernetes-service.yaml
   ```

5. **Kubernetes Ingress (Optional):**

   If you want to access TodoTaskUI from outside the cluster, apply the Kubernetes ingress YAML:

   ```sh
   kubectl apply -f kubernetes-ingress.yaml
   ```

6. **Access TodoTaskUI:**

   Once deployed, access TodoTaskUI in your browser using the configured URL.

## Run Locally

To run TodoTaskUI locally, follow these steps:

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/keshav21/TodoTaskUI.git
   ```

2. **Navigate to the Project Directory:**

   ```sh
   cd TodoTaskUI
   ```

3. **Install Dependencies:**

   Install project dependencies using Yarn:

   ```sh
   yarn install
   ```

4. **Start the Development Server:**

   Run the following command to start the development server:

   ```sh
   yarn start
   ```

5. **Access TodoTaskUI:**

   Open your browser and navigate to `http://localhost:3000` to access TodoTaskUI locally.

## Configuration

You can customize TodoTaskUI by adjusting the following environment variables:

- `REACT_APP_API_BASE_URL`: Base URL for the backend API (default: `http://localhost:8000`).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
