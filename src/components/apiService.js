import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

export const postCreateOneUser = async (data) => {
    return await axiosInstance
        .post("/cruduser/createOneUser", data)
        .then((response) => {
            console.log("post-api-createOneUser:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("post-api-createOneUser:", error);
            throw error;
        });
};

export const deleteDeleteByUuid = async (uuid) => {
    return await axiosInstance
        .delete("/cruduser/deleteByUuid?uuid=" + uuid)
        .then((response) => {
            console.log("post-api-deleteByUuid:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("post-api-deleteByUuid:", error);
            throw error;
        });
};

export const getGetAllUser = async () => {
    return await axiosInstance
        .get("/cruduser/getAllUser")
        .then((response) => {
            console.log("post-api-getAllUser:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("post-api-getAllUser:", error);
            throw error;
        });
};

export const getGetOneUser = async (uuid) => {
    return await axiosInstance
        .get("/cruduser/getOneUser?uuid=" + uuid)
        .then((response) => {
            console.log("post-api-getOneUser:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("post-api-getOneUser:", error);
            throw error;
        });
};

export const putUpdateByUuid = async (data) => {
    return await axiosInstance
        .put("/cruduser/updateByUuid", data)
        .then((response) => {
            console.log("post-api-updateByUuid:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("post-api-updateByUuid:", error);
            throw error;
        });
};
