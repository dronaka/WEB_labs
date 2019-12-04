Task
Create an application using the React library.

The first time the page loads, the user is prompted to receive geolocation data using the HTML5 Geolocation API. If the user agrees to provide geolocation data, we obtain weather data from the external API. If not, we request information for the default city (you can choose the default city yourself). Information about the city, weather data (temperature, wind, pressure, humidity), weather icon, coordinates are drawn on the page in accordance with the layout.

The icon and all the necessary data are in the API https://openweathermap.org.

The interface also has a button with a repeated request for user geolocation.

The user has the ability to add and remove cities to favorites. Weather information is displayed for all cities from the favorites according to the layout. Favorites are stored in LocalStorage.

While data is being downloaded for a specific city / location, we show a loader and / or a message about waiting for data to load.

Working with the global state of the application (for example, a list of selected cities) is implemented using Redux.

The local state of the component (for example, the waiting state for data loading) is through the local state of the component.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.



