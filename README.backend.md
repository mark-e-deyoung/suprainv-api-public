
# Backend

The [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) backend provides [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) access to the database.  It implements the Model and Controller aspects
of a Model-View-Controller (MVC) architecture using select middleware.  The View aspect is implemented
in a seperate front-end project.

Additionally, the backend implements Role Based Access Control (RBAC) using Authentication, Authorization, and Auditing (AAA) middleware to control access to the REST API.

## Controller
We selected [Express](https://expressjs.com/) because it's pretty commonly used and relatively mature/stable. We did not discover a strong consnesus signal in the node.js community but it seems adequate for a simple CRUD application.

While Express can be used for both the Controller and (in a limited sense View) aspects of a MVC architecture we will only ues the Controller aspect because this project has specific non-functional requirements including a seperate frontend that implements the View aspect using the [React](https://reactjs.org/).  We will instatiate the project with a minimal [Embedded JavaScript templating (EJS)](https://ejs.co/) View for development and testing purposes.

Install [Express](https://expressjs.com/) and [generate](https://expressjs.com/en/starter/generator.html) code:
```
npm install --global --save express --save
npm install --global --save-dev express-generator
express --ejs -view=ejs --git backend
cd backend
```
> We will add additional middleware to add features that Express does not include:
> - Authentication, Authorizaiton, and Auditing (AAA) system for  Role Based Access Controls (RBAC) on API routes.
> - Model abstraction


## Model
We use the Sequelize ORM because we haven't decided what the deployment target is yet.
Regardless of deployment target we prefer Postgress over other options -- familiarity -- so we are using it as
backing-store for the ORM in development. There doesn't seem to be a broad consensus on ORM in the node.js community.
Sequelize is suffecient for a simple CRUD application.  Also, it can be used as backing-store for 
authentication middleware.

Before installing and configuring the ORM 


Install [Sequelize](https://sequelize.org/docs/v6/getting-started/) with Postgres driver and adapter.
```
npm install --save sequelize pg pg-hstore
```

Install sequelize-cli
```
npm install --save-dev sequelize-cli
```

Initalize model.
> Note that we are using a customized [.sequelizerc](https://sequelize.org/docs/v6/other-topics/migrations/#the-sequelizerc-file) which modifies the default outputs:
```java
// .sequelizerc
// See: https://sequelize.org/docs/v6/other-topics/migrations/#the-sequelizerc-file

const path = require('path');

module.exports = {
  'config': path.resolve('config', 'database.js'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
};
```
 and and set up migrations [Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/)

Create User model:
```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
```

## Authentication
Install and configure [Passport](http://www.passportjs.org/howtos/password/) for authentication.  
We've never used it before but it seems to support a range of authentication strategies including use of the
Sequelize ORM as a local backing-store.
```
npm install --save passport passport-jwt
```

> Note: Should be able to ues multi-factor [mutual authentication](https://en.wikipedia.org/wiki/Mutual_authentication) using Common Access Card (CAC) client certificates going with [passport-client-certificate](http://www.passportjs.org/packages/passport-client-certificate/).  Have to check on that later.
> See: [HTTPS Authorized Certs](https://github.com/anders94/https-authorized-clients/) and [Authentication using HTTPS client certificates](https://medium.com/@sevcsik/authentication-using-https-client-certificates-3c9d270e8326)

## Authorization
We'll use the [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) (installed above)
strategy to provide [JSON Web Tokens](https://jwt.io/) for authorization claims.Using JWT authentication results from Passport and hand-jammed authorization checks on Express routes.  We might update this if we find a better JWT authorization middleware than passport-jwt. The RBAC is simple because this simple CRUD application only requires two roles (inventory manager, everyone else).


## Auditing
We'll use [morgan](https://github.com/expressjs/morgan) for logging.  Potentially can be used implement auditing -- which is not
a funcitonal requirement of this particular simple CRUD applications.  We chose morgan because it integrates with Express.
```
npm install --save morgan
```


## Additional packages

[helmet](https://github.com/helmetjs/helmet) integrates with express to add some common security oriented HTTP headers.
[dotenv](https://github.com/motdotla/dotenv) for managing environment variables.

Installed with:
```
npm install --save helmet dotenv
```

# Execution
To execute locally do the following:
In the backend directory
```
npm start
```

# Deployment
Trying two approaches:
[Deploy from Github](https://github.com/caprover/deploy-from-github)
and the webhook from [Deployment Methods](https://caprover.com/docs/deployment-methods.html)

# References:

