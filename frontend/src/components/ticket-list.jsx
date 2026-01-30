import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllTicketsService, deleteTicketService, createTicketService, getFilteredTickets } from "../services/ticket-service.jsx" ;
import { TicketCard } from './ticket-card.jsx';

import './ticket-list.css';

export function TicketsList () 
{
    const [tickets,setTickets] = useState([]) ;
    const [loading,setLoading] = useState(true) ;
    const [error,setError] = useState(null) ;

    useEffect(() => {
        getAllTicketsService()
            .then(data => { setTickets(data.data); console.log(data.data)})
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return(<div id ="loading"> Chargement des tickets en cours...   </div>)
    }

    if (error) {
        return(<div id = "error" > Error </div>)
    }

    function updateTicket(tickets_updated) {
        setTickets(tickets_updated);
    }

    function deleteTicket(ticket_to_delete) {
        deleteTicketService(ticket_to_delete.id)
            .then(data => {
                console.log(data);
                return getAllTicketsService();
            })
            .then(data => { 
                setTickets(data.data); 
                console.log(data.data);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }

    function createTicketViaForm() {
        const max_index = getMaxIndex() + 1;
        const form = document.getElementById('create-ticket-form');
        const title = form.elements['title'].value;
        const description = form.elements['description'].value;
        const priority = form.elements['priority'].value;
        const tags_string = form.elements['tags'].value;
        const tags = tags_string.split(',').map(tag => tag.trim());
        const createdAt = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
        const status = "open";

        const ticket_to_create = {
            id: max_index,
            title: title,
            description: description,
            priority: priority,
            tags: tags,
            createdAt: createdAt,
            status: status
        };

        createTicketService(ticket_to_create)
            .then(data => {
                console.log(data);
                return getAllTicketsService();
            })
            .then(data => { 
                setTickets(data.data); 
                console.log(data.data);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }

    function getMaxIndex() {
        let max_index = 0
        console.log('tickets : ', tickets)
        tickets.map((ticket) => {
            if (parseInt(ticket.id) > max_index)
                max_index = parseInt(ticket.id);
        })
        console.log('max_index : ' + max_index)
        return max_index;
    }

    function handleFilterChange() {
        const form = document.getElementById('filter-form');
        const statusSelect = form.elements['status'].value;
        const prioritySelect = form.elements['priority'].value;
        getFilteredTickets(statusSelect, prioritySelect)
            .then(data => {
                setTickets(data.data);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }

    return(
        <div>
             <form id="create-ticket-form" onSubmit={(e) => { e.preventDefault(); createTicketViaForm(); }} >
                <input type="text" name="title" placeholder="Titre" />
                <input type="text" name="description" placeholder="Description" />
                <select name="priority" >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                
                <input type="text" name="tags" placeholder="Tags" />

                <button type="submit">envoyer</button>
            </form>
            <form id="filter-form" onSubmit={(e) => { e.preventDefault(); handleFilterChange(); }}>
                <select name="status" id="status-filter-select" className="filter-select" >
                    <option value="all">All</option>
                    <option value="open">Open</option>
                    <option value="in progress">In Progress</option>
                    <option value="close">Close</option>
                </select>
                <select name="priority" id="priority-filter-select" className="filter-select" >
                    <option value="all">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button id="apply-filters-button" type="submit">Appliquer les filtres</button>
            </form>
            <ul id='ticket-list'>
                { tickets.map(ticket=>{
                    const deleteId = 'delete-button-' + ticket.id;
                    return (
                    <li key={ticket.id}>
                        { TicketCard(ticket, updateTicket, deleteTicket) }
                    </li>)
                })}
            </ul>
        </div>
    )
}

