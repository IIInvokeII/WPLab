<?php
	$name=$_POST['uname'];
	$ccno=$_POST["cno"].$_POST["cno2"].$_POST["cno3"].$_POST["cno4"];
	$ed=$_POST['edate'];
	$cvvcvc=$_POST['cvvcvc'];
	$conn=mysqli_connect('localhost','root','','credit_card');
	$sql = "INSERT INTO `cc_details`(`Name`, `CCNO`, `Expiry_Date`, `CVV`) VALUES ('$name','$ccno','$ed','$cvvcvc')";
	$rs=mysqli_query($conn,$sql) or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error($conn), E_USER_ERROR);
	if($rs)
	{
		echo "Data Inserted\n";
	}
	echo "<a href='index.html'>Insert more data</a>";
	mysqli_close($conn);
 ?>
