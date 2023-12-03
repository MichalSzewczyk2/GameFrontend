import React, {useState, useEffect} from "react";
import './table.css'
import {useNavigate} from "react-router-dom";

export function TableWithButtons({ data }) {
    const navigate = useNavigate();

    const goToGameEdition = async (gameId) => {
        navigate('/gameEdition', { state: { gameId } });
    };

    const handleEditClick = (gameId) => {
        goToGameEdition(gameId);
    };

    const handleDeleteClick = (gameId) => {
        const response = fetch("http://127.0.0.1:8081/game/"+gameId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
            })
    };

    const rows = data.map((row) => (
        <tr key={row.id}>
            <td>{row.title}</td>
            <td>{row.developer}</td>
            <td>{row.age_rating}</td>
            <td>
                <button className='editGameButton' onClick={() => handleEditClick(row.id)}>Edit</button>
            </td>
            <td>
                <button className='deleteGameButton' onClick={() => handleDeleteClick(row.id)}>Delete</button>
            </td>
        </tr>
    ));

    return (
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Developer</th>
                <th>Age rating</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}