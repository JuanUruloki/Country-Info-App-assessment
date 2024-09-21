# Country Info App

## Description

The **Country Info App** is a Full-Stack application that allows users to query detailed information about countries, including their name, flag, bordering countries, and historical population data. The project consists of a backend developed in **Node.js** with **Express** and a frontend developed with **Next.js**. Country data is obtained through the [Nager.Date](https://date.nager.at/) API and the [CountriesNow](https://countriesnow.space/) API.

## Technologies Used

### Backend:
- **Node.js** with **Express.js**
- **Axios** for making HTTP requests to external APIs
- **dotenv** for environment variable management
- **Nodemon** for development with automatic server restarts

### Frontend:
- **Next.js** for frontend development
- **React** as the user interface library
- **Axios** for communication with the backend
- **Chart.js** and **react-chartjs-2** for graph visualization
- **Tailwind CSS** for interface design

## Project Structure

```plaintext
root/
│
├── backend/
│   ├── src/
│   ├── routes/
│   └── server.js
│
└── frontend/
    ├── pages/
    ├── components/
    └── styles/
```
Installation and Configuration

## Prerequisites:
- Node.js installed on your machine
- npm or yarn as the dependency manager
- Optional: Docker (if you want to containerize the application)

## Environment Variables
Make sure to create a `.env` file in the `backend/` directory with the following environment variables:

```plaintext
PORT=5000
API_FLAG=https://countriesnow.space/api/v0.1/countries/flag/images
API_POPULATION=https://countriesnow.space/api/v0.1/countries/population
API_COUNTRY_INFO=https://date.nager.at/api/v3/CountryInfo/ 
```
## Backend Installation

Navigate to the ``backend`` folder:
```bash
cd backend
```

Install the dependencies:   
```bash
npm install
```

Start the server: 
```bash 
npm start
```
The backend server will be running at ``http://localhost:5000``.

## Frontend Installation
1. Navigate to the ``frontend`` folder:
```bash
cd frontend
```
2. Install the necessary dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
The frontend server will be available at ``http://localhost:3000``.

## Running Both Servers in Parallel
To run the frontend and backend in parallel:

1. Open two separate terminal windows.
2. In one terminal, start the ``backend``:
```bash
npm start
```
3. In the other terminal, start the ``frontend``:
```bash
npm run dev
```
### Testing the Application
- Open your browser and visit ``http://localhost:3000`` to interact with the Country Info App.
- Navigate through the list of countries, click on each country to see detailed information, and observe the population graph on the country details page.

## API Documentation
- Nager.Date API: ``https://date.nager.at/swagger/index.html``
- CountriesNow API: ``https://documenter.getpostman.com/view/1134062/T1LJjU52``

## Backend Features
1. Endpoint: Get list of countries

- URL: /api/countries
- Method: GET
- Description: Returns a list of available countries.
2. Endpoint: Get information about a country

- URL: /api/country/:countryCode
- Method: GET
- Description: Returns detailed information about a country, including bordering countries, historical population data, and the flag URL.

3. Endpoint: Get population data
- URL: /api/country/population
- Method: POST
- Description: Returns historical population data of a country based on its common or official name.

## Frontend Features
1. Home Page

- Displays a list of countries with their flag and name. Each country is a link to its details page.
2. Country Details Page Displays detailed information about the selected country, including:

- Country name
- Flag image
- List of bordering countries (links to their respective pages)
- Graph with historical population data

## Style and Design
- Tailwind CSS is used for interface design.
- The application is responsive and adapts to different screen sizes.

## Linting and Code Formatting
- ESLint and Prettier are configured to maintain consistency in the code.
- Before making any commits, ensure that your code is formatted and free of linting errors:

```bash
npm run lint
```
