# Task-Managment-Backend
This repository contains the source code of backend for a full-stack Task managment applicaiton. The project is divided into two parts:

1. **Forntend** - A complete [React.js](https://react.dev/) frontend located in the [Task-Managment-Fornten](https://github.com/SAFVAN-C-M-C/Task-Managment-Forntend) repository.
2. **Backend** - A Node.js backend with Socket.io for real time data visualisation in this repository.



## Getting Started(locally)

### 1. Clone the Repository

```bash
git clone https://github.com/SAFVAN-C-M-C/Task-Managment-Backend.git
```


### 2. Setting up the Backend

Install the required dependencies using npm:

```bash
npm install
```
### 3. Set Up Environment Variables

Create a `.env` file at the root of the project with the following variables:

```env
MONGO_URI=your_mongodb
PORT=your port//4040
CLIENT_URL=//fornt end link (for locally http://localhost:5173)
JWT_SECRET=//your secret 
```

### 4. Run the API

After setting up Elasticsearch, run the server:

```bash
npm run start:dev
```
or 
```bash
npm run build
npm run start
```

The API will start on `http://localhost:4040`.

## API Documentation

You can find the API documentation [here](https://documenter.getpostman.com/view/30048349/2sAXxLAZ4H).