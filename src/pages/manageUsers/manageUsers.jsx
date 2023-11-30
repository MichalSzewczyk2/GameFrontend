import "./manageUsers.scss";
import {useEffect, useState} from "react";
import {get, patch} from "../../utils/apiActions";
import {permissions} from "../../utils/constants";

function ManageUsers() {
    const [users, setUsers] = useState([]);

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
                        <div className="role">{permissions[user.permission]}</div>
                        <div className="blocked">
                            <button>Reset Password</button><br/>
                            <div className="checkbox">
                            <label htmlFor="blocked">Blocked:</label>
                            <input type="checkbox" checked={!!user.blocked} id="blocked" name="blocked" onChange={(e) => handleBlockUser(e, user)}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default ManageUsers;