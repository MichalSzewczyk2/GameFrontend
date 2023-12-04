import React, {useState, useEffect} from "react";
import './table.css'
import {useNavigate} from "react-router-dom";

export function Table({ data }) {
    const navigate = useNavigate();

    const handleRemove = (gameId) => {
        fetch("http://localhost:8080/wishlist/"+gameId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }).then(response => console.log(response));
        window.location.reload();
    };

    const goToGamePage =  async gameId => {
        navigate('/gamePage', {state: {gameId}})
    }

    const rows = data.map((row) => (
        <tr>
            <td  onClick={() => {goToGamePage(row.id)}}>
                <img className='listImage' src={row.cover} alt='cover'></img>
            </td>
            <td onClick={() => {goToGamePage(row.id)}}>{row.title}</td>
            <td onClick={() => {goToGamePage(row.id)}}>{row.developer}</td>
            <td onClick={() => {goToGamePage(row.id)}}>{row.age_rating}</td>
            <td>
                <button className='deleteGameButton' onClick={() => handleRemove(row.id)}>Remove</button>
            </td>
        </tr>
    ));

    return (
        <table>
            <thead>
            <tr>
                <th></th>
                <th>Title</th>
                <th>Developer</th>
                <th>Age rating</th>
                <th>Remove</th>

            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}