**Qonnect**

Qonnect is an all-in-one developer hub designed to empower developers by providing a platform for testing websites, collaborating on projects, sharing courses, mentoring, staying updated with relevant events within the developer community and so much more.


**Project Overview:**

Qonnect serves as a central platform for developers to test their websites, seek feedback from peers, participate in tutoring sessions, share educational courses, mentor others, collaborate on projects, and discover upcoming events. The project aims to enhance collaboration, communication, and knowledge sharing within the developer community, fostering personal and professional growth.


**Features:**

Website testing and feedback mechanism
Collaborations
Course sharing and educational resources
One-on-one tutoring and mentoring sessions
Event postings
User authentication and authorization
Real-time communication and updates


**Technologies Used:**

Frontend: Next.js, React
Backend: Next.js, Firebase
Authentication: Next Auth
UI Frameworks: Tailwind CSS


**Installation Guide:**

Clone the Qonnect repository from GitHub:

Go to the Qonnect repository on GitHub.
Click on the "Code" button and copy the repository URL.
Open your terminal or command prompt.
Navigate to the directory where you want to clone the repository.

Run the following command:
git clone [repository URL]
Wait for the cloning process to complete.

cd qonnect


**Install dependencies using npm or yarn:**

If you're using npm, run:
npm install

If you're using yarn, run:
yarn install

This will install all the necessary dependencies specified in the package.json file.


**Set up a Firebase project and obtain necessary API keys:**

Go to the Firebase console and create a new project.
Follow the instructions to set up Firebase for your project.
Obtain the Firebase configuration object containing the API keys, which includes values such as apiKey, authDomain, projectId, etc.


**Configure Next Auth for authentication:**

Create a file named .env file in the project directory.
Add your Firebase configuration object obtained in the previous step.
Configure Next Auth with Firebase authentication provider.
Save the changes to the .env file.

Use either npm or yarn to start the development server.
If you're using npm, run:
npm start

If you're using yarn, run:
yarn start

Open your web browser and navigate to the URL where the project is hosted locally (usually http://localhost:3000).
