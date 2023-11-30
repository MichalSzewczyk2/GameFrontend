import "./manageUsers.scss";
import {useEffect, useState} from "react";
import {get, patch} from "../../utils/apiActions";
import {permissions} from "../../utils/constants";
import PasswordResetModal from "./PasswordResetModal";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        get("user").then((data) => {
            if (data && data.length > 0) {
                setUsers(data)
            }
        });
    }, []);

    const handleBlockUser = (event, user) => {
        user.blocked = event.target.checked;
        patch(`user`, user).then(() => {
            setUsers(users => users.map((u) => {
                if (u.id === user.id) {
                    return user;
                }
                return u;
            }));
        });
    }

    const handleRoleChange = (event, user) => {
        user.permission = event.target.value;
        patch(`user`, user).then(() => {
            setUsers(users => users.map((u) => {
                if (u.id === user.id) {
                    return user;
                }
                return u;
            }));
        });
    }

    const handleResetPassword = (newPassword, user) => {
        user.password = newPassword;
        patch(`user`, user).then(() => {
            setUsers(users => users.map((u) => {
                if (u.id === user.id) {
                    return user;
                }
                return u;
            }));
            handleCloseModal();
        });
    }

    return (
        <div className="manage-users">
            <h2>Manage Users</h2>
            <div className="user-list">
                <div className="header">
                    <div className="name">Username</div>
                    <div className="email">Email</div>
                    <div className="role">Role</div>
                    <div className="blocked">Actions</div>
                </div>
                {users.map((user) => (
                    <div className="user" key={user.id}>
                        <div className="name">{user.username}</div>
                        <div className="email">{user.email}</div>
                        <div className="role">
                            <select name="role" id="role" onChange={(e) =>  handleRoleChange(e, user)}>
                                <option value="1" selected={user.permission === 1}>{permissions[1]}</option>
                                <option value="2" selected={user.permission === 2}>{permissions[2]}</option>
                            </select>
                        </div>
                        <div className="blocked">
                            <button onClick={() => handleOpenModal(user)}>Reset Password</button><br/>
                            <div className="checkbox">
                            <label htmlFor="blocked">Blocked:</label>
                            <input type="checkbox" checked={!!user.blocked} id="blocked" name="blocked" onChange={(e) => handleBlockUser(e, user)}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <PasswordResetModal
                    onSubmit={handleResetPassword}
                    onClose={handleCloseModal}
                    user={selectedUser}/>
            )}
        </div>
    )
}


export default ManageUsers;