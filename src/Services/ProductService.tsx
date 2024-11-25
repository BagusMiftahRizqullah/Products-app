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

  export const getOneProduct = async (id:number): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Optionally, throw the error to be handled by the caller
    }
  };

  export const addToCart = async (body: any): Promise<any> => {
    try {
      console.log("body", body); // Tidak perlu stringify untuk logging
      const response = await axios.post(
        `${BASE_URL}/carts/add`, // Perbaikan URL
        body, // Tidak perlu stringify
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
      return response.data; // Kembalikan data dari respons
    } catch (error: any) {
      console.error('Error adding to cart:', error?.response?.data || error.message); // Log lebih informatif
      throw new Error(error?.response?.data?.message || 'Failed to add to cart'); // Lempar error dengan pesan yang jelas
    }
  };