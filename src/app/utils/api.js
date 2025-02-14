import axios from "axios";

// Create axios instance
const apiClient = axios.create({
  baseURL: "https://shoutoutbnd.onrender.com/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
// API Calls

// Function to handle user login
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/login", credentials);

    if (response.data && response.data.token && response.data.payload.user) {
      localStorage.setItem("authToken", response.data.token);

      return { token: response.data.token, user: response.data.payload.user };
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const RegisterUser = async (credentials) => {
  try {
    const response = await apiClient.post("/register", credentials);

    console.log("Registration Success:", response.data.user, "testing");

    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Registration failed. Please try again.");
  }
};

export const Verifyotp = async (credentials) => {
  try {
    const response = await apiClient.post("/verify-otp", credentials);
    return response.data;
  } catch (error) {
    console.error("Error fetching table data:", error);
    throw error;
  }
};

// Table data
// export const getShoutout = async () => {
//   try {
//     const response = await apiClient.get("/shoutouts");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching table data:", error);
//     throw error;
//   }
// };

export const getShoutout = async (recipient) => {
  if (!recipient) {
    throw new Error("recipient name is required to fetch shoutouts");
  }

  try {
    console.log(`Fetching shoutouts for recipient: ${recipient}`); // Debugging log
    const response = await apiClient.get(`/shoutouts?recipient=${encodeURIComponent(recipient)}`);
    console.log("Shoutouts Response:", response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error("Error fetching shoutouts:", error.response?.data || error.message);
    throw error;
  }
};


export const sendShoutOut = async (credentials) => {
  try {
    const response = await apiClient.post("/shoutouts", credentials);
    console.log()
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error; 
  }

};




export default apiClient;
