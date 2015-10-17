<?php
// Connect to database server
mysql_connect("ezsched411.web.engr.illinois.edu", "ezsched4_sjzhang", "Geminio0424") or die (mysql_error ());

// Select database
mysql_select_db("ezsched4_glorious_leader") or die(mysql_error());

// SQL query
$strSQL = "INSERT INTO `Test` VALUES('george', 'bob')"

// Execute the query (the recordset $rs contains the result)
$rs = mysql_query($strSQL);

if($rs)
  debug_to_console( "Test" );
else
  debug_to_console( "Bad" );

// Close the database connection
mysql_close();
?>
