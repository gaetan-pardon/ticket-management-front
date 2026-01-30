const URL="http://localhost:8000/tickets"


/**
 * Permet de récupérer l'ensemble des tickets de la base de données.
 * @returns Liste des tickets
 */
export const getAllTicketsService = async () => {
    try {
        const response = await fetch(URL, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tickets = await response.json();
        return tickets;
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
};

/**
 * Mettre à jour le statut d'un ticket.
 * @param {*} id - Id du ticket à modifier
 * @param {*} new_status - Le nouveau statut du ticket
 * @returns 
 */
export const updateStatusService = async (id, new_status) => {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "status" : new_status })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const updatedTicket = await response.json();
        return updatedTicket;

    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
}

/**
 * Supprimer un ticket.
 * @param {*} id - Id du ticket à supprimer.
 * @returns 
 */
export const deleteTicketService = async (id) => {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const deletedTicket = response.json();
        return deletedTicket;
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
}

/**
 * Créer un nouveau ticket respectant la mise en forme.
 * @param {*} ticket - Le ticket à créer 
 * @returns Le ticket créé
 */
export const createTicketService = async (ticket) => {
    try {
        const response = await fetch(`${URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const createdTicket = response.json();
        return createdTicket;
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
}

/**
 * Récupérer les tickets par statut et priorité.
 * @param {*} status { open, in progress, close }
 * @param {*} priority { Low, Medium, High }
 * @param {*} order { creation_date, priority, status }
 * @returns Liste des tickets filtrés et ordonnés
 */
export const getFilteredTickets = async (status, priority, order) => {
    try {
        console.log('Fetching tickets with status ', status, ' and priority ', priority, ' and order ', order);
        const response = await fetch(`${URL}/filter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status, priority, order })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tickets = await response.json();
        return tickets;
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
}
