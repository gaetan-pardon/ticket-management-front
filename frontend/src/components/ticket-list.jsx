import { useState, useEffect } from 'react';
import { deleteTicketService, createTicketService, getFilteredOrderedTickets } from "../services/ticket-service.jsx" ;
import { TicketCard } from './ticket-card.jsx';

import './ticket-list.css';

export function TicketsList () 
{
    const [tickets, setTickets] = useState([]) ;
    const [loading, setLoading] = useState(true) ;
    const [error, setError] = useState(null) ;
    const [validationError, setValidationError] = useState(null);
    const [deletingTickets, setDeletingTickets] = useState(new Set());
    const [isCreating, setIsCreating] = useState(false);
    const [currentStatusFilter, setCurrentStatusFilter] = useState('all');
    const [currentPriorityFilter, setCurrentPriorityFilter] = useState('all');
    const [currentOrderFilter, setCurrentOrderFilter] = useState('date_desc');
    
    // États pour le formulaire de création
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [priorityInput, setPriorityInput] = useState('Low');
    const [tagsInput, setTagsInput] = useState('');

    useEffect(() => {
        getFilteredOrderedTickets(currentStatusFilter, currentPriorityFilter, currentOrderFilter)
            .then(data => { setTickets(data); })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [currentStatusFilter, currentPriorityFilter, currentOrderFilter]);

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
    //     if (deletingTickets.has(ticket_to_delete.id)) return;

    //     setDeletingTickets(prev => new Set(prev).add(ticket_to_delete.id));

        deleteTicketService(ticket_to_delete.id)
            .then(data => {
                return getFilteredOrderedTickets(currentStatusFilter, currentPriorityFilter, currentOrderFilter);
            })
            .then(data => { 
                console.log(data);
                setTickets(data);
            })
            .catch(error => {
                setError(error);
            });
            // .finally(() => {
            //     setDeletingTickets(prev => {
            //         const newSet = new Set(prev);
            //         newSet.delete(ticket_to_delete.id);
            //         return newSet;
            //     });
            // });
    }

    function createTicketViaForm(e) {
        e.preventDefault();
        
        if (isCreating) return;


        // Validation
        const trimmedTitle = titleInput.trim();
        const trimmedDescription = descriptionInput.trim();
        if (!trimmedTitle || !trimmedDescription) {
            setValidationError("Veuillez remplir tous les champs obligatoires (Titre et Description).");
            return;
        }
        if (trimmedTitle.length < 5) {
            setValidationError("Le titre doit contenir au moins 5 caractères.");
            return;
        }
        if (trimmedTitle.length > 50) {
            setValidationError("Le titre ne doit pas dépasser 50 caractères.");
            return;
        }
        if (trimmedDescription.length < 10) {
            setValidationError("La description doit contenir au moins 10 caractères.");
            return;
        }
        if (trimmedDescription.length > 500) {
            setValidationError("La description ne doit pas dépasser 500 caractères.");
            return;
        }

        setValidationError(null);
        setIsCreating(true);

        // Parser les tags et filtrer les tags vides
        const tags = tagsInput
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        const createdAt = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
        const status = "Open";

        const ticket_to_create = {
            title: titleInput.trim(),
            description: descriptionInput.trim(),
            priority: priorityInput,
            tags: tags,
            createdAt: createdAt,
            status: status
        };

        createTicketService(ticket_to_create)
            .then(() => {
                return getFilteredOrderedTickets(currentStatusFilter, currentPriorityFilter, currentOrderFilter);
            })
            .then(data => { 
                setTickets(data);
                
                // Réinitialiser le formulaire après création réussie
                setTitleInput('');
                setDescriptionInput('');
                setPriorityInput('Low');
                setTagsInput('');
            })
            .catch(error => {
                setError("error");
            })
            .finally(() => {
                setIsCreating(false);
            });
    }

    return(
        <div>
             <form id="create-ticket-form" className="ticket-form" onSubmit={createTicketViaForm} >
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Titre" 
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                />
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Description" 
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                />
                <select 
                    name="priority"
                    value={priorityInput}
                    onChange={(e) => setPriorityInput(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                
                <input 
                    type="text" 
                    name="tags" 
                    placeholder="Tags (séparés par des virgules)" 
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                />

                <button disabled={isCreating} type="submit">
                    {isCreating ? 'Création...' : 'Créer un nouveau ticket'}
                </button>
            </form>
            {validationError && <div className="validation-error">{validationError}</div>}
            <div className="ticket-form filter-form">
                <h3>Filtrer les tickets</h3>
                <div className="filters-container">
                    <div className="filter-group">
                        <label htmlFor="status-filter-select">Statut :</label>
                        <select 
                            name="status" 
                            id="status-filter-select" 
                            className="filter-select"
                            value={currentStatusFilter}
                            onChange={(e) => setCurrentStatusFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="Open">Open</option>
                            <option value="In progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="priority-filter-select">Priorité :</label>
                        <select 
                            name="priority" 
                            id="priority-filter-select" 
                            className="filter-select"
                            value={currentPriorityFilter}
                            onChange={(e) => setCurrentPriorityFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="order-filter-select">Ordre :</label>
                        <select 
                            name="order" 
                            id="order-filter-select" 
                            className="filter-select"
                            value={currentOrderFilter}
                            onChange={(e) => setCurrentOrderFilter(e.target.value)}
                        >
                            <option value="date_desc">Creation date (desc)</option>
                            <option value="date_asc">Creation date (asc)</option>
                            <option value="priority">Priority</option>
                            <option value="status">Status</option>
                            <option value="alphabetical">Alphabetical Order</option>
                        </select>
                    </div>
                </div>
            </div>
            <ul id='ticket-list'>
                { tickets.map(ticket =>
                    TicketCard(ticket, updateTicket, deleteTicket, deletingTickets.has(ticket.id), currentStatusFilter, currentPriorityFilter, currentOrderFilter)
                )}
            </ul>
        </div>
    )
}

