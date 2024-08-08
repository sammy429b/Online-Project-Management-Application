# Online Project Management Application

<!-- ## Why Did I Build This? -->

This project was developed as part of an assignment for Techprimelab, aiming to demonstrate my full-stack development skills. The purpose was to create a comprehensive mini project that showcases my ability to build a fully functional web application with both frontend and backend components. The project includes critical features such as user authentication, project management, real-time status updates, and a dynamic dashboard, all of which are essential in a professional development environment.

## Built with :

[![MongoDB][MongoDB]][MongoDB-url]
[![Express.js][Express.js]][Express-url]
[![React][React.js]][React-url]
[![Node.js][Node.js]][Node-url]
[![JWT][JWT]][JWT-url]
[![DaisyUI][DaisyUI]][DaisyUI-url]
[![React Hook Form][ReactHookForm]][ReactHookForm-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Nodemailer][Nodemailer]][Nodemailer-url]
[![React Router][ReactRouter]][ReactRouter-url]
[![Highcharts React][HighchartsReact]][HighchartsReact-url]
[![Axios][Axios]][Axios-url]
[![Bcrypt][Bcrypt]][Bcrypt-url]

 <!-- [![Shadcn][Shadcn]][Shadcn-url] -->
 <!-- [![Redis][Redis]][Redis-url] -->

## Get Started

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/sammy429b/TeachPrimeLab.git
    cd TeachPrimeLab
    ```

2.  **Install Dependencies**

    Frontend

    ```bash
    cd client
    npm install
    ```

    Backend

    ```bash
    cd ../server
    npm install
    ```

3.  **Set Up Environment Variables**

    Create `.env` files in both the `client` and `server` directories with the necessary environment variables. Refer `.env.example` files for required variables.

4.  **Start the Application**

    Backend

    ```bash
    cd server
    npm run dev
    ```

    Frontend

    ```bash
    cd ../client
    npm run dev
    ```

## How I Did It?
1. **Login Page** :<br>
    I built a secure login form using React Hook Form for validation and Axios for authentication requests. JWT was implemented to manage user sessions securely, ensuring only authenticated users can access the app.

2. **Project Page**: <br>
   A form was created to capture project details, including dropdowns for options and a date-picker for dates. Data validation was enforced on both the frontend and backend to maintain data integrity, with Axios handling form submission.

3. **Project Listing Page**: <br>
   I developed a dynamic table to display project records with features like search, sorting, and pagination. React's state management was used for handling these interactions, while Axios fetched data from the backend.

4. **Status Updates**: <br>
   Buttons for status updates (Running, Closed, Cancelled) were added to the project listing. These trigger API calls to update the status in the database, and changes are reflected immediately in the UI without a page reload.

5. **Dashboard Page**: <br>
   The dashboard was created using HighchartsReact to display department-wise project success rates and counters for different project statuses. A single API call was used to fetch this data, optimizing performance and minimizing network requests.


## Future Enhancements
1. **Role-Based Access Control (RBAC)**:<br>
    Implementing RBAC to allow different levels of access and permissions based on user roles (e.g., Admin, Manager, Viewer).

2. **Real-Time Notifications**:<br>
    Adding real-time notifications using WebSockets to inform users about project status updates or deadlines.

3. **Improved Error Handling**:<br>
    Enhancing the application with more robust error handling and user-friendly messages for a better user experience.

4. **UI/UX Improvements**:<br>
    Refining the UI/UX based on user feedback, possibly incorporating animations and transitions for a smoother user interface.

5. **Mobile Responsiveness**:<br>
    Further optimizing the application for mobile devices, ensuring that all features are accessible and user-friendly on smaller screens.

[React.js]: https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Shadcn]: https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&logo=shadcn&logoColor=white
[Shadcn-url]: https://shadcn.dev/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Redis]: https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
[JWT]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[JWT-url]: https://jwt.io/
[Nodemailer]: https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white
[Nodemailer-url]: https://nodemailer.com/
[DaisyUI]: https://img.shields.io/badge/DaisyUI-4B5563?style=for-the-badge&logo=DaisyUI&logoColor=white
[DaisyUI-url]: https://daisyui.com/
[ReactHookForm]: https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=React-Hook-Form&logoColor=white
[ReactHookForm-url]: https://react-hook-form.com/
[ReactRouter]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=React-Router&logoColor=white
[ReactRouter-url]: https://reactrouter.com/
[HighchartsReact]: https://img.shields.io/badge/Highcharts_React-003366?style=for-the-badge&logo=Highcharts&logoColor=white
[HighchartsReact-url]: https://www.highcharts.com/blog/tutorials/react/
[Axios]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white
[Axios-url]: https://axios-http.com/
[Bcrypt]: https://img.shields.io/badge/Bcrypt-4A6DA7?style=for-the-badge&logo=Bcrypt&logoColor=white
[Bcrypt-url]: https://www.npmjs.com/package/bcryp
