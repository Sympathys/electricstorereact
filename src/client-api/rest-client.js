import axios from 'axios';

class RestClient {
    path = '';
    authToken = '';
    axiosInstance = null;

    // Hàm config để thiết lập cấu hình
    config(baseURL, headers = {}) {
        // Khởi tạo axiosInstance với config
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            timeout: 100000,
            withCredentials: true,
            headers: headers,
        });

        // Thêm interceptor để xử lý lỗi
        this.axiosInstance.interceptors.response.use(
            response => response,
            error => {
                console.error('API Error:', error);
                throw error;
            }
        );

        return this;
    }

    // Kiểm tra xem axiosInstance đã được khởi tạo chưa
    checkInstance() {
        if (!this.axiosInstance) {
            throw new Error('Please configure RestClient before making requests');
        }
    }

    // Hàm thiết lập dịch vụ
    service(path) {
        this.checkInstance();
        this.path = path;
        return this;
    }

    // Phương thức xác thực
    async authentication(strategy, email, password) {
        try {
            const response = await this.axiosInstance.post(`/${this.path}`, {
                strategy,
                email,
                password,
            });
            this.authToken = response.data.token;
            this.axiosInstance.defaults.headers.Authorization = `Bearer ${this.authToken}`;
            return response.data;
        } catch (error) {
            console.error("Error during authentication", error);
            throw error;
        }
    }

    // Phương thức làm mới xác thực
    async reAuthentication() {
        try {
            const response = await this.axiosInstance.post(`/${this.path}/re-auth`, {
                token: this.authToken,
            });
            this.authToken = response.data.token;
            this.axiosInstance.defaults.headers.Authorization = `Bearer ${this.authToken}`;
            return response.data;
        } catch (error) {
            console.error("Error during re-authentication", error);
            throw error;
        }
    }

    // Tạo mới dữ liệu
    async create(data) {
        try {
            const response = await this.axiosInstance.post(`/${this.path}`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error("Error creating data", error);
            throw error;
        }
    }

    // Lấy dữ liệu theo ID
    async get(objectId) {
        try {
            const response = await this.axiosInstance.get(`/${this.path}/${objectId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching data by ID", error);
            throw error;
        }
    }

    // Tìm kiếm dữ liệu với query
    async find(query = '') {
        try {
            const response = await this.axiosInstance.get(`/${this.path}?${query}`);
            return response.data;
        } catch (error) {
            console.error("Error finding data", error);
            throw error;
        }
    }

    // Cập nhật dữ liệu theo ID
    async patch(objectId, data) {
        try {
            const response = await this.axiosInstance.patch(`/${this.path}/${objectId}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating data", error);
            throw error;
        }
    }

    // Xóa dữ liệu theo ID
    async remove(objectId) {
        try {
            const response = await this.axiosInstance.delete(`/${this.path}/${objectId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting data", error);
            throw error;
        }
    }

    // Phương thức đăng ký
    async signup({ username, email, password }) {
        try {
            const response = await this.axiosInstance.post('/account/sign-up', {
                username: username,
                email: email,
                password: password,
            });
            return response.data;
        } catch (error) {
            console.error("Error during signup", error);
            throw error;
        }
    }
}

// Khởi tạo clientAPI và thiết lập baseURL là localhost:3000
const clientAPI = new RestClient();
clientAPI.config(
    'http://localhost:3000',
    {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // Thêm token hoặc các headers khác ở đây nếu cần
    }
);

export default clientAPI;
