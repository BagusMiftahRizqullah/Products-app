import axios from 'axios';
const BASE_URL ='https://dummyjson.com'

export const getAllProduct = async (): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Optionally, throw the error to be handled by the caller
    }
  };