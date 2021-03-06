## Collaborative Online Judge System

This is a full-stack project with an Angular based front end, NodeJS based restful API, and docker based code execution engine. I created multiple components in the front end to allow users to review and add problems and provide solution. The data is passed to the restful API, which in turn saves to MongoDB. Multiple users can also collaborate on problems real-time using websocket.

• Implemented a web-based collaborative code editor which supports multiple user editing simultaneously (ACE, Socket.io, Redis);

• Designed and developed a single-page web application for coding problems (Angular2, Auth0, Node.js, MongoDB);

• Built a user-code executor service which can build and execute user’s code (Docker, Flask);

• Refactored and Improved system throughput by decoupling services using RESTful API and loading balancing by Nginx (REST API, Nginx). 
## Screenshots 
#### Problemlist
![image1](/assets/ProblemList.png)
#### Edit
![image2](/assets/Edit.png)

## Project Architecture
<img src="/assets/project-architecture.png" width="500">  

## Diagram for oj-client and oj-server  
![image2](/assets/diagram.png)  

## Socket IO communications  
![image2](/assets/socketio.png)



