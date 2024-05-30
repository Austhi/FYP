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

temporal alternative
- **URL**: `/user/register/admin`
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
- **Parameters**:
  - None
- **Responses**:
  - 200 OK: Successful request. Returns the user's information.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.

### Access on Sub-Services (temporal)

#### Access to Transversal Data

- **URL**: `/access/transversal`
- **HTTP Method**: GET
- **Description**: Retrieves transversal data.
- **Parameters**:
  - None
- **Responses**:
  - 200 OK: Successful request. Returns transversal data.
  - 500 Internal Server Error: Server-side error.

#### Access to Medical Data

- **URL**: `/access/medical`
- **HTTP Method**: GET
- **Description**: Retrieves medical data.
- **Parameters**:
  - None
- **Responses**:
  - 200 OK: Successful request. Returns medical data.
  - 500 Internal Server Error: Server-side error.

#### Get Patients linked to a Doctor
- **URL**: `/doctor/patient_list`
- **HTTP Method**: GET
- **Description**: Retrieves a list of patients linked to the currently authenticated doctor. This endpoint is useful for doctors to view their associated patients.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - None
- **Responses**:
  - 200 OK: Successful request. Returns the doctor's patients list.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.

#### Get Patients by name
- **URL**: `/admin/patient_list`
- **HTTP Method**: GET
- **Description**: Fetches a list of patients based on a name query parameter. This endpoint allows searching for patients by full or partial name.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `name` (string): Patient's name or part of it.
- **Responses**:
  - 200 OK: Successful request. Returns the patients list find by the name.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.

#### Get Doctor by name
- **URL**: `/admin/doctor_list`
- **HTTP Method**: GET
- **Description**: Fetches a list of doctors based on a name query parameter. This endpoint allows searching for doctors by full or partial name.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `name` (string): Doctor's name or part of it.
- **Responses**:
  - 200 OK: Successful request. Returns doctors list find by the name.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.

### Documentation for Doctor's Patients Endpoint

This is the documentation for the endpoint that retrieves patients associated with a doctor:

#### Get Doctor's Patients
- **URL**: `/admin/doctor_patients`
- **HTTP Method**: GET
- **Description**: Retrieves a list of patients associated with a specific doctor.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `doctorID` (integer): ID of the doctor whose patients are to be retrieved.
- **Responses**:
  - 200 OK: Successful request. Returns the list of patients associated with the doctor.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.
  - 500 Internal Server Error: An error occurred during the retrieval process.

This endpoint allows administrators to retrieve a list of patients associated with a specific doctor. Ensure to provide the required parameters for successful operation.

#### Assign Patient to Doctor
- **URL**: `/admin/assign/patient_to_doctor`
- **HTTP Method**: POST
- **Description**: Assigns a patient to a doctor based on their respective IDs. This endpoint is used to establish a relationship between a doctor and a patient.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `doctor_id` (string): Doctor's id.
  - `patient_id` (string): Patient's id.
- **Responses**:
  - 200 OK: Successful request.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.

#### Deassign Patient to Doctor
- **URL**: `/admin/deassign/patient_to_doctor`
- **HTTP Method**: POST
- **Description**: Removes the association between a doctor and a patient based on their respective IDs. This endpoint is used to end the relationship between a doctor and a patient.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `doctor_id` (string): Doctor's id.
  - `patient_id` (string): Patient's id.
- **Responses**:
  - 200 OK: Successful request.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.


### Documentation for Creating Doctor and Patient

Below is the documentation for the routes responsible for creating doctors and patients:

#### Create Doctor
- **URL**: `/admin/create/doctor`
- **HTTP Method**: POST
- **Description**: Creates a new doctor with the provided information.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `fullName` (string): Full name of the doctor.
  - `email` (string): Email address of the doctor.
  - `role` (string): Role of the doctor (e.g., surgeon, physician).
  - `password` (optional)(string): Role of the doctor (e.g., surgeon, physician).

- **Responses**:
  - 200 OK: Doctor successfully created.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.

#### Create Patient
- **URL**: `/admin/create/patient`
- **HTTP Method**: POST
- **Description**: Creates a new patient with the provided information.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `fullName` (string): Full name of the patient.
  - `email` (string): Email address of the patient.
  - `birthDate` (string) (optional): Date of birth of the patient.
- **Responses**:
  - 200 OK: Patient successfully created.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.

These routes allow for the creation of doctors and patients within the system. Ensure to provide the required parameters for successful creation. Let me know if you need further assistance or details.

#### Delete Doctor
- **URL**: `/admin/doctor`
- **HTTP Method**: DELETE
- **Description**: Deletes a doctor with the provided ID.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `doctorID` (string): ID of the doctor to be deleted. This parameter should be included in the request body.
- **Responses**:
  - 200 OK: Doctor successfully deleted.
  - 401 Unauthorized: User is not authenticated, does not have necessary permissions, or is not an administrator.
  - 500 Internal Server Error: An error occurred during the deletion process.

#### Delete Patient
- **URL**: `/admin/patient`
- **HTTP Method**: DELETE
- **Description**: Deletes a patient with the provided ID.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `patientID` (string): ID of the patient to be deleted. This parameter should be included in the request body.
- **Responses**:
  - 200 OK: Patient successfully deleted.
  - 401 Unauthorized: User is not authenticated, does not have necessary permissions, or is not an administrator.
  - 500 Internal Server Error: An error occurred during the deletion process.

These routes allow for the deletion of doctors and patients within the system. Ensure to provide the required parameters for successful deletion. Let me know if you need further assistance or details.

### Documentation for Request Management Endpoints

Below is the documentation for the endpoints responsible for managing requests to assign or deassign patients to doctors.

#### Get Request Types
- **URL**: `/admin/request/types`
- **HTTP Method**: GET
- **Description**: Retrieves the possible request types.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Responses**:
  - 200 OK: Returns an array of possible request types.
    ```json
    ["assign", "desassign"]
    ```

#### Create Request
- **URL**: `/request/create`
- **HTTP Method**: POST
- **Description**: Creates a new request to either assign or deassign patients to a doctor.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `typeRequest` (string): The type of request ("assign" or "desassign").
  - `id_patient` (array): Array of patient IDs to be assigned or deassigned.
- **Responses**:
  - 200 OK: Request successfully created.
    ```json
    { "newReq": { ... } }
    ```
  - 400 Bad Request: Invalid request type.

#### Process Request
- **URL**: `/request/interact`
- **HTTP Method**: POST
- **Description**: Processes a request to either assign or deassign patients based on validation.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `requestID` (string): The ID of the request.
  - `validation` (boolean): Whether the request is validated or not.
- **Responses**:
  - 200 OK: Request successfully processed.
    ```json
    { "msg": "Request validated" }
    ```
  - 400 Bad Request: Request does not exist or request type is not possible.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.

#### Get Pending Requests
- **URL**: `/request/get`
- **HTTP Method**: GET
- **Description**: Retrieves a list of pending requests.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Responses**:
  - 200 OK: Returns a list of pending requests.
    ```json
    [
      {
        "id": "request_id",
        "type": "assign",
        ...
      },
      ...
    ]
    ```
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.

### Documentation for Patient Medical Records Management

Below is the documentation for the endpoints responsible for managing medical records for patients:

#### Get Patient Records
- **URL**: `/patient/records`
- **HTTP Method**: GET
- **Description**: Retrieves medical records for a specific patient.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `patientID` (integer): ID of the patient whose records are to be fetched.
- **Responses**:
  - 200 OK: Returns the medical records of the specified patient.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.
  - 500 Internal Server Error: An error occurred while retrieving the records.

#### Add Medical Record
- **URL**: `/patient/records/add`
- **HTTP Method**: POST
- **Description**: Adds a new medical record for a patient.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Request Body**:
  ```json
  {
    "patientID": 1,
    "medical_record_date": "2024-05-28",
    "data": {
        "age": 54,
        "chest_pain": 0,
        "restingBP": 130,
        "serum_cholestrol": 246,
        "fasting_blood_sugar": 1,
        "resting_electro_records": 0,
        "max_heart_rate": 178,
        "exercise_angia": 0,
        "oldpeak": 1.5,
        "slope": 1,
        "no_major_vessels": 0
    }
  }
  ```
  - All fields in `data` are optional.
- **Responses**:
  - 200 OK: Medical record successfully added.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.
  - 500 Internal Server Error: An error occurred while adding the record.

#### Delete Medical Record
- **URL**: `/patient/records`
- **HTTP Method**: DELETE
- **Description**: Deletes a medical record based on the provided record ID.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `recordID` (integer): ID of the record to be deleted.
- **Responses**:
  - 200 OK: Medical record successfully deleted.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.
  - 500 Internal Server Error: An error occurred while deleting the record.

#### Modify Medical Record
- **URL**: `/patient/records/modify`
- **HTTP Method**: POST
- **Description**: Modifies an existing medical record based on the provided record ID and modified data.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Request Body**:
  ```json
  {
    "recordID": 1,
    "data": {
        "age": 55,
        "chest_pain": 1,
        "restingBP": 120,
        "serum_cholestrol": 220,
        "fasting_blood_sugar": 0,
        "resting_electro_records": 1,
        "max_heart_rate": 160,
        "exercise_angia": 1,
        "oldpeak": 2.0,
        "slope": 2,
        "no_major_vessels": 1,
        "medical_record_date": "2024-06-01"
    }
  }
  ```
  - All fields in `data` are optional.
- **Responses**:
  - 200 OK: Medical record successfully modified.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.
  - 500 Internal Server Error: An error occurred while modifying the record.

#### Get Available Roles
- **URL**: `/roles`
- **HTTP Method**: GET
- **Description**: Retrieves a list of available roles.
- **Authentication Required**: None
- **Responses**:
  - 200 OK: Returns a list of roles (`["admin", "doctor", "staff"]`).
  - 500 Internal Server Error: An error occurred while retrieving the roles.

These endpoints allow for the management of medical records for patients and retrieval of available roles. Ensure to provide the required parameters for successful operation. Let me know if you need further assistance or details.

### Documentation for AI Analysis Endpoint

#### Perform AI Analysis
- **URL**: `/ai_analysis`
- **HTTP Method**: GET
- **Description**: Performs AI analysis on the latest medical record of a patient.
- **Authentication Required**: Adonis Token in the `Authorization` header in the format `Bearer <token>`
- **Parameters**:
  - `patientID` (integer): ID of the patient whose records are to be analyzed.
- **Responses**:
  - 200 OK: Successful analysis. Returns the analysis result.
  - 401 Unauthorized: User is not authenticated or does not have necessary permissions.
  - 500 Internal Server Error: An error occurred during analysis.

This endpoint allows users with roles of "admin", "doctor", or "staff" to perform AI analysis on the latest medical record of a specified patient. Ensure to provide the required parameters for successful operation.