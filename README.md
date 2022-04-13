## General info

This project is a Form generator that gets data about the form from the MongoDB database and renders it in React.js. After submitting, the users data gets saved in the database, in a different collection.
Changing form data in the database will cause a different form to be generated each time.

## Setup

To run this project, install it locally using npm:

1. cd /react/form-generator
2. npm install
3. change DATABASE env variable to your Mongo database connection string
4. npm start 
5. repeat steps 2 and 3 but from the server folder
