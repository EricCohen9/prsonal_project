# Real-time Code and Package Listener

This project enables real-time monitoring of code and packages in containers running within the Docker Compose environment.

## Usage

Follow these steps to use the program:

1. Clone the repository:
   git clone https://github.com/mosheilan942/working_demo_for_hot_reload_with_docker_compose

2. You don't have to install the dependencies in order
   to see the real-time listening, but if you want to,
   do this stages:
     cd server/app
     npm install
     cd ../client/app
     npm install
 3. exit to root folder  

4. Run the Docker Compose file:
  docker compose watch

5. Start the development server:
  cd server/app
  npm run dev

7. Ensure that changes are reflected in real-time.
