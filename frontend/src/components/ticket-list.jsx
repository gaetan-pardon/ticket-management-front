import { useState, useEffect } from 'react';
import {getAllTickets} from "../services/ticket-service.jsx" ;


export function TicketsList () 
{
    const [tickets,setTickets] = useState([]) ;
    const [loading,setLoading] = useState(true) ;
    const [error,setError] = useState(null) ;


    useEffect(() => {
        getAllTickets()
            .then(data => { setTickets(data.data);})
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return(<div id ="loading"> Chargement des tickets en cours...   </div>)
    }
    if (error) {
        return(<div id = "error" > Error </div>)
    }
    return(<ul>{tickets.map(ticket=>{
        return (<li key={ticket.id}>{ticket.title}</li>)
    })}


    </ul>)
}
