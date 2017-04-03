var solr = require('solr-client');

// Create a client
var client = solr.createClient('127.0.0.1','8983','jcg','/solr');

// Add a new document
client.search({ name : 'A' },function(err,obj){
   if(err){
      console.log(err);
   }else{
      console.log('Solr response:', obj);
   }
});