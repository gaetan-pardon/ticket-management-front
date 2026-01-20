import { useState, useEffect } from 'react';


export function TicketCard(ticket) {

    const selectId = `select-status-${ticket.id}`;

    function updateStatus() {
        const selectObject = document.getElementById(selectId);
        const selectedValue = selectObject.options[selectObject.selectedIndex].value;
        console.log("value : " + selectedValue);
    }

    return (
        <div>
            id : {ticket.id}<br/>
            title : {ticket.title}<br/>
            description : {ticket.description}<br/>
            priority : {ticket.pritority}<br/>
            status : {ticket.status}<br/>
            tags : { ticket.tags.join(', ')}<br/>
            createdAt : {ticket.createdAt}<br/>
            <select id={selectId}>
                <option value="open">Open</option>
                <option value="in progress">In progress</option>
                <option value="close">Close</option>
            </select>
            <button onClick={updateStatus}>Mettre à jour le statut</button>
        </div>
    )
} 
