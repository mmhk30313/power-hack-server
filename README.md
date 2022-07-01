<h1>Create a Backend system for Power Hack Project</h1>

### To run this project please go through the following instruction:

<ul>
    <li>git clone https://github.com/mmhk30313/power-hack-server.git</li>
	<li> cd power-hack-server/li>
	<li> then create .env file from env and set proper credentials</li>
	<li> run `npm install` or `yarn` to install all necessary packages </li>
	<li> Then `npm run dev` or `yarn dev` to run by dev-mode in http://localhost:4000</li>
	<li>Prod-mode in https://power-hack.herokuapp.com/</li>
</ul>

### Live Url: 

##### https://power-hack.vercel.app

### Client Code:

##### https://github.com/mmhk30313/power-hack-client

## Used Tools & Technologies:

<ul>
	<li>Nodejs (Express)</li>
	<li>JWT for authentication & authorization</li>
</ul>

## Description:

<p>All APIs are with auth-guard except `/api/registration`  and `/api/login`. User related some apis are created for making us clear understanding.</p>

## Extra API:

There are created some extra APIs for users


## API Descriptions:

- Primary Requirement:
	* /api/registration -> User registration api
	* /api/login -> User login api
	* /api/logout -> User logout api
	* /api/billing-list -> Getting all billing methods for filtering & getting all billing methods
	* /api/add-billing -> Creating a new billing method
	* /api/update-billing/:id -> Updating a billing method by bill_id
	* /api/delete-billing/:id -> Deleting a billing method by bill_id
- Extra API:
	* / -> Root url gives welcome to us
	* /api/user/update -> User update only for user
	* /api/user/all -> Getting all users
	* /api/user/find-one/:email -> Find a user by the user email
	* /api/user/delete -> Deleting a user
	* /api/user -> Find user details by token