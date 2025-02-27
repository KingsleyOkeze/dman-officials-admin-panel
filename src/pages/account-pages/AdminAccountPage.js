import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// If you use a library like react-icons or Font Awesome, import the necessary icons here
// Example: import { FaSearch, FaEdit } from "react-icons/fa";
import "../../styles/pages-styles/account-pages-styles/AdminAccountPage.css";
import { FaSearch } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";


function AdminAccountPage() {
    const { accessToken, adminId, refreshAccessToken } = useContext(AuthContext);
    const { showAlert, customAlert } = useContext(AlertContext);
    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages (example)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [activityData, setActivityData] = useState([]);
    const [editMode, setEditMode] = useState({
        fullName: false,
        phoneNumber: false
    });

    const getAdminDetails = async () => {
        try {
            const response = await axios.get(`/admin/fetch-admin-profile/${accessToken}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });
            console.error("fetching admin details:", response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setPhoneNumber(response.data.phoneNumber);
        } catch (err) {
            console.error("Error fetching admin details:", err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(getAdminDetails);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }

        }
    };

    const getCustomerActivity = async () => {
        try {
            const response = await axios.get(
                `/admin/fetch-customers-activity?page=${paginationIndex}&limit=7`,
            {
                headers: {
                      Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            setActivityData(response.data.activities);
            setTotalPages(response.data.totalPages);
            console.log("Fetched customers activity", response.data);

        } catch (err) {
            console.error("Error fetching user activity:", err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(getCustomerActivity);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }

        }
    };

    const handlePreviousFunction = () => {
        if (paginationIndex > 0) {
          setPaginationIndex(paginationIndex - 1);
        }
    };
      
    const handleNextFunction = () => {
        if (paginationIndex < totalPages) {
          setPaginationIndex(paginationIndex + 1);
        }
    };

    useEffect(() => {
        getAdminDetails();
    }, [paginationIndex]);
      
    useEffect(() => {
        getAdminDetails();
        getCustomerActivity();
    }, []);

    const handleProfileChange = (field, value) => {
        if (field === "fullName") setFirstName(value);
        if (field === "lastName") setLastName(value);
        if (field === "phoneNumber") setPhoneNumber(value);
    };

    const toggleEditMode = (field) => {
        setEditMode((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSaveDetails = async () => {
        try {
            const response = await axios.put(`/admin/update-profile/${accessToken}`, {
                firstName,
                lastName,
                phoneNumber
            },
            {
                headers: {
                      Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                alert("Profile updated successfully");
                getAdminDetails();
            }

        } catch (err) {
            console.error("Error updating profile:", err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(handleSaveDetails);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }

        }
    };



    return (
        <div className="admin-account-page-container">
            {/* Header section */}
            <div className="admin-account-page-header">
                <h1>Admin Account</h1>
                {/* <div className="admin-account-page-search-container">
                    <input type="text" placeholder="Search..." />
                    <FaSearch className="admin-account-page-search-btn" />
                </div> */}
            </div>

            {/* Main content section */}
            <div className="admin-account-page-content">
                {/* Profile Details Section */}
                <div className="admin-account-page-profile-section">
                    <h2>Profile Details</h2>
                    <div className="admin-account-page-profile-item">
                        <label>Full Name:</label>
                        <div className="admin-account-page-profile-value">
                            {editMode.fullName ? (
                                <input
                                    type="text"
                                    className="admin-account-page-profile-value-input"
                                    value={firstName}
                                    onChange={(e) => handleProfileChange("fullName", e.target.value)}
                                />
                            ) : (
                                <span>{firstName}</span>
                            )}
                            <button 
                                className="admin-account-page-profile-btn"
                                onClick={() => toggleEditMode("fullName")}>
                                <AiOutlineEdit
                                    className="admin-account-page-profile-icon"
                                /> {editMode.fullName ? "Cancel" : "Edit"}
                            </button>
                        </div>
                    </div>
                    <div className="admin-account-page-profile-item">
                        <label>Last Name:</label>
                        <div className="admin-account-page-profile-value">
                            {editMode.lastName ? (
                                <input
                                    type="text"
                                    className="admin-account-page-profile-value-input"
                                    value={lastName}
                                    onChange={(e) => handleProfileChange("lastName", e.target.value)}
                                />
                            ) : (
                                <span>{lastName}</span>
                            )}
                           <button
                               className="admin-account-page-profile-btn"
                               onClick={() => toggleEditMode("lastName")}>
                               <AiOutlineEdit className="admin-account-page-profile-icon" /> {editMode.lastName ? "Cancel" : "Edit"}
                            </button>
                        </div>
                    </div>
                    <div className="admin-account-page-profile-item">
                        <label>Phone Number:</label>
                        <div className="admin-account-page-profile-value">
                            {editMode.phoneNumber ? (
                                <input
                                    type="text"
                                    className="admin-account-page-profile-value-input"
                                    value={phoneNumber}
                                    onChange={(e) => handleProfileChange("phoneNumber", e.target.value)}
                                />
                            ) : (
                                <span>{phoneNumber}</span>
                            )}
                            <button 
                                className="admin-account-page-profile-btn"
                                onClick={() => toggleEditMode("phoneNumber")}>
                                <AiOutlineEdit 
                                    className="admin-account-page-profile-icon"
                                /> {editMode.phoneNumber ? "Cancel" : "Edit"}
                            </button>
                        </div>
                    </div>
                    <button className="admin-account-page-save-btn" onClick={handleSaveDetails}>
                        Save Details
                    </button>
                </div>

                {/* Activity Table Section */}
                <div className="admin-account-page-activity-section">
                    <h2>User Activity</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Action</th>
                                <th>Time</th>
                                <th>IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activityData && activityData.length > 0 ? (
                                activityData.map((row) => (
                                    <tr key={row._id}>
                                        <td>
                                            {row.customerRef.firstName} {row.customerRef.lastName}
                                        </td>
                                        <td>{row.activityType}</td>
                                        <td>{row.createdAt}</td>
                                        <td>{row.ipAddress}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", padding: "10px", fontStyle: "italic" }}>
                                        No activity records available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* Pagination Section */}
                    <div className="admin-account-page-pagination-container">
                        <button
                            className="admin-account-page-pagination-button pagination-prev"
                            onClick={handlePreviousFunction}
                            disabled={paginationIndex === 0}
                        >
                            Previous
                        </button>
                        <span className="admin-account-page-pagination-status">
                            {paginationIndex + 1} / {totalPages}
                        </span>
                        <button
                            className="admin-account-page-pagination-button pagination-next"
                            onClick={handleNextFunction}
                            disabled={paginationIndex + 1 === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>

                

            </div>
        </div>
    );
}


export default AdminAccountPage;
