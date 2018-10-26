##
## Insert previous JSON documents from bulk_pg.json into ElasticSearch database.
##

curl -X PUT http://localhost:9200/books

curl -X POST 
     -H "Content-Type: application/json" 
     --data-binary "@bulk_pg.json" 
     http://localhost:9200/books/book/_bulk