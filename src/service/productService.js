import axiosInstance from '../api/axiosInstance';

const productService = {
    getAllProducts: async () => {
        try {
            const response = await axiosInstance.get('/product/');
            return response.data;
        } catch (error) {
            console.error("Error fetching users", error);
            throw error;
        }
    },
    getProduct: async (id) => {
        try{
            const response = await axiosInstance.get(`/product/${id}`);
            return response.data;
        }catch (error) {
            console.error("Error fetching user by ID", error);
            throw error;
        }
    },
}
export default productService;