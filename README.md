# ticket-management

## Installation

Lien le backend : https://github.com/cmoileboss/ticket-management

Dans le dossier backend :  
```pip install uvicorn```  
```pip install fastapi```  

Dans le dossier frontend :  
```npm install```

## Lancement de l'API
  
```cd backend```  
```./launch.bat```

## Lancement du frontend
  
```cd frontend```  
```npm run dev``` 

Fontend accessible depuis localhost:5173

## Endpoints  

**Get Endpoints**  
http://localhost:8000/tickets  
http://localhost:8000/count-status

**POST Endpoints**  
http://localhost:8000/tickets/{id}
http://localhost:8000/tickets/filter

**DELETE Endpoints**  
http://localhost:8000/tickets/{id}

**PATCH Endpoints**  
http://localhost:8000/tickets/{id}
