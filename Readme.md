# Backend Project Name

## Description

This project is a backend application developed with the Adonis.js framework. It serves as the backend for Digital Health and provides the necessary functionalities to securely manage patient medical data.

## Installation

Make sure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Repository Cloning

Clone this repository to your machine using the following command:
   ```bash
   git clone https://github.com/Austhi/FYP.git
   ```

2. It's then necessary to use docker-compose to facilitate the compilation of our three parts simultaneously.

Two ways are available to achieve this, the command-line version for Linux and the version via Docker Desktop.

### Docker Installation

#### Linux:

1. Update the apt package index and install packages to allow apt to use a repository over HTTPS:

```bash
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

2. Install Docker Compose:

Download the Docker Compose binary from the GitHub repository using the following command:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/<version>/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
Replace <version> with the version of Docker Compose you want to install. For example, to install version 1.29.2, you would replace <version> with 1.29.2.

- Apply executable permissions to the binary:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

2. Verify the installation:

Check that Docker Compose is installed correctly by running:

```bash
docker-compose --version
```

#### Windows:

1. **Download the Docker Desktop installer** from the official Docker website: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

2. **Double-click the installer** to run it.

3. **Follow the installation prompts**. Make sure to enable the option to install required Windows components for WSL 2.

4. Once the installation is complete, **Docker Desktop should start automatically**. You can verify the installation by checking the Docker icon in the system tray.

#### Mac:

1. **Download the Docker Desktop installer** from the official Docker website: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

2. **Double-click the installer** to open it.

3. **Drag the Docker icon to the Applications folder**.

4. **Launch Docker Desktop from the Applications folder**.

5. You may be prompted to **authorize the Docker Desktop installer with your system password**.

6. Once the installation is complete, **Docker Desktop should start automatically**. You can verify the installation by checking the Docker icon in the menu bar.

These steps should guide you through the installation process for Docker Desktop on both Windows and Mac.

### Starting the Server

#### Starting the Server with Docker-Compose Command line

1. **Navigate to your project directory**: Open a terminal or command prompt and navigate to the directory where your Docker Compose configuration file (docker-compose.yml) is located.

2. **Run the Docker Compose up command**: Use the following command to start your services defined in the docker-compose.yml file:

```bash
docker-compose up -d
```
The -d flag runs the services in detached mode, meaning they run in the background.

3. **Wait for the services to start**: Docker Compose will start the containers defined in your docker-compose.yml file. Depending on your setup, this may take some time. You can monitor the startup process by viewing the container logs:

```bash
docker-compose logs -f
```
This command displays the logs of all containers in the stack and follows them in real-time.

4. **Access your services**: Once the containers are up and running, you can access your services as configured in the docker-compose.yml file. You can access to the server at http://localhost:3336.

5. **Stop the services**: To stop the services started by Docker Compose, you can use the following command:

```bash
docker-compose down
```
This command stops and removes the containers defined in the docker-compose.yml file.

By following these steps, you can start your services using Docker Compose from the command line. Adjust the commands as needed based on your specific setup and configuration.

#### Starting the Server with Docker Desktop

1. **Ensure Docker Desktop is running**: Open Docker Desktop application on your system and make sure it's up and running.

2. **Navigate to your project directory**: Open a terminal or command prompt and navigate to the directory where your Adonis.js project is located.

3. **Build your Docker image (if not already built)**: If you haven't already built your Docker image, you can do so using the `docker build` command. Replace `<your-image-name>` with the name you want for your Docker image and `<path-to-dockerfile>` with the path to your Dockerfile:
    ```bash
    docker build -t <your-image-name> <path-to-dockerfile>
    ```

4. **Run your Docker container**: Once your Docker image is built, you can run it as a container using the `docker run` command. Replace `<your-image-name>` with the name of your Docker image and `<port>` with the port on which your Adonis.js server listens:
    ```bash
    docker run -p <port>:<port> <your-image-name>
    ```

    For example, if your Adonis.js server is listening on port 3333 and your Docker image is named `my-adonis-image`, you would run:
    ```bash
    docker run -p 3333:3333 my-adonis-image
    ```

5. **Access your Adonis.js server**: Once the Docker container is running, your Adonis.js server should be accessible at `http://localhost:<port>`, where `<port>` is the port you specified.

6. **Verify the server is running**: You can verify that your server is running by accessing it in your web browser or using tools like cURL or Postman.

By following these steps, you should be able to start your Adonis.js server using Docker Desktop.


## Route Documentation

### Authentication

#### Login
- **URL**: `/user/login`
- **HTTP Method**: POST
- **Description**: Allows a user to log in by providing their email and password.
- **Parameters**:
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Responses**:
  - 200 OK: Successful login. Returns the Adonis Token in the format `Bearer <token>`
  - 400 Bad Request: Missing or invalid parameters.
  - 401 Unauthorized: Invalid credentials.

#### Register
- **URL**: `/user/register`
- **HTTP Method**: POST
- **Description**: Allows a user to create an account by providing their personal information.
- **Parameters**:
  - `fullName` (string): User's full name.
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Responses**:
  - 201 Created: Account created successfully.
  - 400 Bad Request: Missing or invalid parameters.
  - 409 Conflict: Email already in use.

#### Logout
- **URL**: `/user/logout`
- **HTTP Method**: POST
- **Description**: Allows a user to log out by invalidating their authentication token.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - None
- **Responses**:
  - 201 Created: Successful logout.
  - 400 Bad Request: Error processing the request.
  - 401 Unauthorized: Missing or invalid Adonis Token.

#### Get Current User

- **URL**: `/user/me`
- **HTTP Method**: GET
- **Description**: Retrieves the information of the currently authenticated user.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Responses**:
  - 200 OK: Successful request. Returns the user's information.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.

### Access on Sub-Services (temporal)

#### Access to Transversal Data

- **URL**: `/access/transversal`
- **HTTP Method**: GET
- **Description**: Retrieves transversal data.
- **Responses**:
  - 200 OK: Successful request. Returns transversal data.
  - 500 Internal Server Error: Server-side error.

#### Access to Medical Data

- **URL**: `/access/medical`
- **HTTP Method**: GET
- **Description**: Retrieves medical data.
- **Responses**:
  - 200 OK: Successful request. Returns medical data.
  - 500 Internal Server Error: Server-side error.