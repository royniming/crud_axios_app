import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { getGetAllUser, deleteDeleteByUuid } from "./apiService";

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // For link to edit page
    const setUuid = (uuid) => {
        localStorage.setItem("uuid", uuid);
        console.log("set uuid =", uuid);
    };

    // Using useNavigation for redirecting to page
    let navToPage = useNavigate();

    // Delete Operation
    const handleDelete = async (uuid) => {
        // confirm of window
        const deleteConfirmed = window.confirm(
            "Are you sure you want to delete?"
        );
        if (!deleteConfirmed) {
            return;
        }

        await requestDelete(uuid); //requst delete api
        await requestQuery(); // refresh the list

        navToPage("/");
    };

    // request api for delete user
    const requestDelete = async (uuid) => {
        try {
            await deleteDeleteByUuid(uuid);
        } catch (error) {
            console.error("delete error:", error);
        }
    };

    // request api of getAllUser
    const requestQuery = async () => {
        try {
            const result = await getGetAllUser();
            setData(result);
        } catch (error) {
            console.error("get error:", error);
        } finally {
            setLoading(false);
        }
    };

    // request api
    useEffect(() => {
        //request all data
        requestQuery();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ margin: "5rem" }}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th hidden>id</th>
                        <th>uuid</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td hidden>{item.id}</td>
                                    <td>{item.uuid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>
                                        {/* Button for Update*/}
                                        <Link to={"/edit"}>
                                            <Button
                                                onClick={(e) => {
                                                    setUuid(item.uuid);
                                                }}
                                                variant="secondary"
                                                size="sm"
                                                className="me-1"
                                            >
                                                Update
                                            </Button>
                                        </Link>
                                        {/* Button for Delete*/}
                                        <Button
                                            onClick={(e) =>
                                                handleDelete(item.uuid)
                                            }
                                            variant="danger"
                                            size="sm"
                                            className="me-1"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>

            {/* Link to Create page */}
            <Link className="d-grid gap-2" to="/create">
                {/* Button of Create*/}
                <Button variant="warning" size="sm">
                    Create
                </Button>
            </Link>
        </div>
    );
};

export default Home;
