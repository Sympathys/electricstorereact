import axiosInstance from '../api/axiosInstance';

const authService = {
    login: async ({account, password}) => {
        try {
            const response = await axiosInstance.post('/auth',{
                Email: account,
                Password: password,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching users", error);
            throw error;
        }
    },
    signup: async ({name, password, email}) => {
        try {
            const response = await axiosInstance.post('/account/sign-up',{
                Username: name,
                Password: password,
                Email : email,
            });
            return response.data;
        }
        catch (error) {
            console.error("Error fetching users", error);
            throw error;
        }
    },
}
export default authService;