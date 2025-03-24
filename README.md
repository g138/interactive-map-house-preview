# Interactive Property Map Application

An interactive web application for exploring property estates with clickable regions on SVG maps. Users can interact with property plots on the map, view property details, and navigate through available properties with zoom and pan capabilities.

### Live URL

> https://wonderful-ocean-082528d03.6.azurestaticapps.net/

## Architecture Overview

This application uses a modern web architecture with a fully decoupled frontend and backend:

-   **Frontend**: React application deployed as an Azure Static Web App
-   **Backend**: GraphQL API using Apollo Server deployed on Azure App Service
-   **Database**: Azure Cosmos DB with MongoDB API
-   **Deployment**: Automated deployment from GitHub repository

<img src="https://www.mermaidchart.com/raw/158ce4b8-0251-4507-874a-7f980c85916d?theme=light&version=v0.1&format=svg" />


## Technology Stack

### Frontend

-   **React**: UI framework
-   **Apollo Client**: GraphQL client
-   **SVG Processing**: Custom utilities for SVG parsing and interaction

### Backend

-   **Apollo Server**: GraphQL server implementation
-   **GraphQL**: API query language
-   **Node.js**: JavaScript runtime
-   **MongoDB**: Document database (via Cosmos DB)

### Deployment & Infrastructure

-   **Azure Static Web Apps**: Hosting for frontend
-   **Azure App Service**: Hosting for backend
-   **Azure Cosmos DB**: Database with MongoDB API
-   **GitHub**: Source code repository
-   **Azure DevOps**: CI/CD pipeline

## Getting Started

### Prerequisites

-   Node.js 18.x or higher
-   npm
-   Azure account (for deployment)

### Local Development

#### Client

```bash
# Navigate to client directory
cd client

# Install dependencies
npm ci

# Start development server
npm start
```

The client will run on [http://localhost:3000](http://localhost:3000).

#### Server

```bash
# Navigate to server directory
cd server

# Install dependencies
npm ci

# Start development server
npm run dev
```

The GraphQL server will run on [http://localhost:4000/graphql](http://localhost:4000/graphql).
