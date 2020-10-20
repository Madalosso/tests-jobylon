This is a coding test for Python Developer at Jobylon.

* Used techologies: Django, Django REST Framework, PostgreSQL, React, TypeScript, Next.js Styled Components, Context API, SWR.

### TODOs
* unittest (pytest and jest will be used)
* better frontend and backend exception handling
* fields validation
* alerts on frontend (toast messages for better user experience)

# Usage instructions
1. Clone project to a directory of your preference

## Backend

### Setting up database (PostgreSQL)
#### With Docker
1. Run `(sudo) docker-compose up --build` on the same directory level as **docker-compose.yml** file
2. Create a **.env** file on directory **back/chat/chat** (same directory as **settings.py**)
3. Fill with:
```sql
POSTGRESQL_DB=chat
POSTGRESQL_HOST=localhost
POSTGRESQL_PORT=5432
POSTGRESQL_USER=postgres
POSTGRESQL_PASS=postgres
```
#### Without Docker
1. Create a new database named **chat** on your PostgreSQL connection
2. Create a **.env** file on backend project directory **back/chat/chat**
3. Fill the database variables **POSTGRESQL_DB, POSTGRESQL_HOST, POSTGRESQL_PORT, POSTGRESQL_USER and POSTGRESQL_PASS** on .env file with your database settings

* There is also two optional keys that you can add to the .env file: **SECRET_KEY** and **DEBUG** (default is False)
* There is a **.env.example** with all keys if you get lost somehow

### Setting up and running
1. Run `pip install -r requirements.txt` (do not forget to activate your virtual environment if needed)
2. On the same directory level that manage.py run `python manage.py migrate && python manage.py runserver`

All right, backend is all set up!

## Frontend (must have node.js 12.x+ and yarn or npx installed - www.nodejs.org | www.npmjs.com/package/npx | www.yarnpkg.com/)
After Node and yarn/npx are installed, proceed

### Setting up modules
#### With npm
1. Run `npm install` on same directory level of packege.json

#### With yarn
1. Run `yarn` on same directory level of packege.json

### Running Frontend
1. Run `npx dev` or `yarn dev` for developer environment or `npx build` or `yarn build` for create a production environment
