const URL="http://localhost:8000/tickets"

export const getAllTickets = async () => {
    try {
        const response = await fetch(URL) ;
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tickets = await response.json();
        console.log("tikets :" , tickets);
        return tickets;
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
};