# OAMK 2nd year Adanced Web Application Project

## FRONT-END:

### DIN21SP Group 9

On October 31, 2022, we began a new course. We were to choose our team members to work with. We chose our group with the conditions that the members are willing to work in the campus together during weekdays, approximately from 8-16 as much as possible. Our team mutually agreed as well to aim for the highest grade possible (5).

The task was to design and implement a data visualization application for visualizing climate change data such as temperature and co2. The tools required for this were given that the frontend must use React- frameworks and the backend written with either Java or JavaScript. We chose the latter. To generate the visualization charts, we used the JavaScript library for HTML charts: ChartJS. For website design we sketched the look of the website first on Figma.

### Kick-Off – The UI Plan

We wanted to create a very minimalistic UI design to keep the focus of the page in the graphs. For inspiration, we looked up other websites for different visualizations and we ended up with ‘lights off’ colors. We believed that darker image provides more emphasize to the page and is easier for the eyes. Very quickly then, we began sketching the page using Figma to visualize the static outlook of the page.

During our meetings we decomposed the project for every week into phases of progression. At first, we sketched a roadmap, how we want to aim progression every week. In addition, by the end of every week, we would setup a team meeting where we would discuss in detail of our current progress and what tasks to distribute.

We kicked off with all of us learning ChartJS and its properties using various guides on YouTube and StackOverflow before starting to implement the data.

For this project, all of us have participated and contributed to designing, programming, implementing, and leading of this project. This has made the project very engaging for everyone. Last project where we had designated jobs, but this task requires for us all to contribute as equally as possible. Especially when aiming for the grade we wanted to.

### Implementation – The Architecture of the application

Our application is built in a NodeJS runtime environment and follows the following architecture:

#### Front end

Front-end is the face of our application. When a user visits our website, it is the first element they see. It is built within ReactJS frameworks which handles the different imported user interface components which communicate the back end to render the web page.
Axios handles the pages HTTP requests to the back end and posts result back to the user such as sign-up and login and fetching the visualization data and ChartJS of course to render that given data.

#### Back end

Our back end is connected to PostgreSQL-Database which then is running on a container with Docker. Through it, we compile the necessary data such as the JSON-data of the visualizations and which the server communicates with to run and render the web site. The server also collects cookies (JW-Tokens) to authorize and authenticate real users and to store their customized views.

### How to run Front-end:
You need to install required modules:

`npm install`

Then you would be able to run fron-end with:

`npm start`

### The Last Stretch

The following weeks all the members have worked significant effort to push all the 9 different visualizations. The last weeks we have been pushing the user functionalities, final changes on CSS, and getting ready to deploy our application.
This project has been for us a challenging and rewarding experience, where we have learned new tools and techniques in programming. The use of group working tools like Github and Teams have played an intricate part. Every member had the opportunity to gain experience on how to lead a project and to follow one.
