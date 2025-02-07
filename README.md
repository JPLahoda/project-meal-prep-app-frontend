# Meal Prep App
This is an app that generates new, random food recipes.  Users can save recipes that they want to try.  Then, they can select recipes to get instructions as well as a custom shopping list. 


## Home
The home page contains a button get new recipe ideas. When pressed, a new recipe is generated.
## About
The about page gives a description of the app, as well as who the app is inteneded for with some testomonials.
## Meal Plan
The meal plan page displays all the current recipes stored in the user's database.  The user can select the recipes they want for the week and then "Checkout" when they're ready to produce their shopping list.
## Checkout
This page generates a custom shopping list based on the user's selection.

# How to run
To see the current deployment, click [Here](https://my-secret-recipes.netlify.app/).

To run on your local machine, go to the [How to Build](#how-to-build): 

***NOTE: Please go to the main repository if you would like to build this locally. This repository only contains the frontend of the application.***

# How to contribute
Follow this project board to know the latest status of the project: (https://github.com/orgs/cis3296f24/projects/114) 

### How to build
1. Clone this repository to your local machine
2. Download Node.js for your respective system, [Here](https://nodejs.org/en/download/current) 
3. Make sure npm and node are now on your local machine
    1. `npm -v`
    2. `node -v`
4. `cd chefs-meal-planner`(the lowercase one)
5. Create a file called .env inside chefs-meal-planner directory and add these two variables to hold api keys. (Sources to access your own API Keys can be found below)
    1.   REACT_APP_OPENAI_API_KEY = your key here
    2.   REACT_APP_SPOONACULAR_API_KEY = your key here

6. `npm install` will install the necessary packages 
7. `npm start` will open the app in a new tab with a localhost server 

### Sources to access API Keys
1. OpenAI: https://platform.openai.com/docs/api-reference/chat/create
2. Spoonacular: https://spoonacular.com/food-api
