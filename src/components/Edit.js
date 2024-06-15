import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { Link, useNavigate } from "react-router-dom";
import { getGetOneUser, putUpdateByUuid } from "./apiService";

const Edit = () => {
    const [uuid, setUuid] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [data, setData] = useState({});

    // Using useNavigation for redirecting to page
    let navToPage = useNavigate();

    // Function for creating a post/entry
    const handleUpdate = (e) => {
        e.preventDefault(); // prevent reload
        if (name === "" || age === "") {
            alert("invalid input");
            return;
        }
        //prepare the data
        data.uuid = uuid;
        data.name = name;
        data.age = age;

        //request the api of update
        requestUpdate(data);
        navToPage("/");
    };

    //request api of getOneUser
    const requestQuery = async () => {
        try {
            const result = await getGetOneUser(localStorage.getItem("uuid"));
            setData(result);
            setUuid(result.uuid);
            setName(result.name);
            setAge(result.age);
        } catch (error) {
            console.error("get error:", error);
        }
    };

    //request api of updateByUuid
    const requestUpdate = async (data) => {
        try {
            await putUpdateByUuid(data);
        } catch (error) {
            console.error("update error:", error);
        }
    };

    useEffect(() => {
        requestQuery();
    }, []);

    return (
        <div>
            <h5>Edit</h5>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                {/* Input of Name*/}
                <Form.Group as={Row} className="mb-1" controlId="formBasicName">
                    <Form.Label column sm={1} className="text-start fw-bold">
                        Name
                    </Form.Label>
                    <Col sm={11}>
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter Name"
                            required
                        />
                    </Col>
                </Form.Group>

                {/* Input of Age*/}
                <Form.Group as={Row} className="mb-1" controlId="formBasicAge">
                    <Form.Label column sm={1} className="text-start fw-bold">
                        Age
                    </Form.Label>
                    <Col sm={11}>
                        <Form.Control
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            type="number"
                            placeholder="Age"
                            required
                        />
                    </Col>
                </Form.Group>

                {/* Button of Submit*/}
                <Button
                    onClick={(e) => handleUpdate(e)}
                    variant="primary"
                    type="submit"
                    size="sm"
                >
                    Update
                </Button>

                {/* Link of back to home page*/}
                <Link className="d-grid gap-2" to="/">
                    <Button variant="warning" size="sm">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
};

export default Edit;
