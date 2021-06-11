# Database

Looking at this:
https://github.com/bcgov/helm-charts/tree/master/charts/patroni

more oc / kubernetes docs relating to postgres:
https://docs.openshift.com/container-platform/3.4/using_images/db_images/postgresql.html
https://www.openshift.com/blog/openshift-connecting-database-using-port-forwarding
https://kubernetes.io/docs/concepts/services-networking/network-policies/

postgis help:
https://www.postgresql.org/docs/9.2/app-psql.html


## specific to watertrack

Modified the SQL_Watertrack.txt significantly to get it to work, in an automated way
Still needs work... constraints should be moved to bottom of script
Testing should have taken place to verify that the sql file worked for creating the 
necessary objects

To create the objects run the table twice.

## Setting up testing on local

### Build the client

```
cd client
docker build -t water-client .
```

### Build the Server

```
cd server
docker build -t water-server .
```

### Build / create objects in db.



### start the containers
```
PORT=3000

PGHOST=localhost
PGUSER=databaseuser
PGPASSWORD=databasepass
PGDATABASE=databasename
PGPORT=5432

docker run --publish 5432:5432 postgres
docker run --publish 3000:3000 water-server
docker run --publish 8888:8888 water-client
```




# Todo:
* ~~Create chart with database in it~~
* ~~Create database service~~
* verify backend can get env vars without the .env file
* figure out process to create objects in database
* Create dockerfile for client
* Create dockerfile for server
* Create Github actions to build container
* Create template and add to helm chart to deploy the client container
* create services for backend
* create route for backend
* create service for frontend
* create route for frontend
* Create template and add to helm chart to deploy the server container
* Define the ingress network policies
* define the egress network policies
* Test entire process
