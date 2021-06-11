# Database

Looking at this:
https://github.com/bcgov/helm-charts/tree/master/charts/patroni

more oc / kubernetes docs relating to postgres:
https://docs.openshift.com/container-platform/3.4/using_images/db_images/postgresql.html
https://www.openshift.com/blog/openshift-connecting-database-using-port-forwarding
https://kubernetes.io/docs/concepts/services-networking/network-policies/

postgis help:
https://www.postgresql.org/docs/9.2/app-psql.html


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
