// enviroments
const environment = {
  production: {
    API_BASE_URL: "https://airbox-backend.vercel.app/api/",
  },
  development: {
    API_BASE_URL: "http://localhost:5000/api/",
  },
};

const currentEnvironment = import.meta.env.VITE_REACT_APP_ENV || "development";
// const currentEnvironment = "production";

export default environment[currentEnvironment];
