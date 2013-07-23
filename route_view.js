{
	"map": function(doc){
	  if (doc.collection == "route" && doc.owner == "kajjjak") {
	    emit(doc.collection, doc);
	  } 
	}

}