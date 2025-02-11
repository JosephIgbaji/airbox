// enviroments
const environment = {
  production: {
    API_BASE_URL: "https://",
  },
  development: {
    API_BASE_URL: "http://localhost:5000/",
  },
};

const currentEnvironment = import.meta.env.VITE_REACT_APP_ENV || "development";
// const currentEnvironment = "production";

export default environment[currentEnvironment];
