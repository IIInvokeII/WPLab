<?php
	$conn=mysqli_connect('localhost','root','','credit_card');
	$a=[];
	$sql="SELECT * FROM `cc_details`;";
	$result=mysqli_query($conn,$sql);
	while($row=mysqli_fetch_assoc($result))
	{
		array_push($a,$row);
	}
	echo json_encode($a);
	mysqli_close($conn);
?>
