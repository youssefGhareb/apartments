
# apartments
This containerized repository includes 3 main dockerized services. To setup all services seamlessly please:

1. Navigate to frontend directory `cd frontend` and run `npm install`to install dependencies. This is required for next to be installed to be able to run the app. 
2. Run `docker-compose up --build`to build and initialize the frontend, backend, and database services. 
3. Then navigate to http://localhost:3001 to view the frontend.

Optional:
There is a migration file to insert some data in the apartments table but it can't run on docker-copmose since the database table would not be created by typeORM yet. After first docker build do the following:

 1. Run the following command to access the backend container shell `docker exec -it backend /bin/sh`
 2. Run the migration command `npm run db:migrate`

Database table will now be populated with some data.
