import React, {useState, useEffect} from "react";
import './table.css'
import {useNavigate} from "react-router-dom";

export function Table({data}, {button}) {
    const navigate = useNavigate()

    let rows = [];

    const goToGamePage =  async gameId => {
        navigate('/gamePage', {state: {gameId}})
    }

    for (let row of data) {
        rows.push(
            <tr onClick={() => {goToGamePage(row.id)}}>
                <td>
                    <img className='listImage' src={row.cover} alt='cover'></img>
                </td>
                <td>{row.title}</td>
                <td>{row.developer}</td>
                <td>{row.age_rating}</td>
            </tr>)
    }
    return (
        <table>
            <thead>
                <th></th>
                <th>Title</th>
                <th>Developer</th>
                <th>Age rating</th>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}