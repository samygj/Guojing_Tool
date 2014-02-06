<?php
$mysql_host = "mysql10.000webhost.com";
$mysql_database = "a5457464_gjtool";
$mysql_user = "a5457464_guojing";
$mysql_password = "D1g1ta!";

$conn = mysql_connect($mysql_host, $mysql_user, $mysql_password);
if (!$conn) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db($mysql_database, $conn);

// Initiation
if ($_POST['type'] == 'init') {
	$totalResult = mysql_query("SELECT * FROM 515calc WHERE type = 'total'");
	$totalRow = mysql_fetch_assoc($totalResult);

	$paymentResult = mysql_query("SELECT * FROM 515calc WHERE type = 'payment' AND processed = 0");
	$paymentRows = array();
	while ($paymentRow = mysql_fetch_assoc($paymentResult))
		$paymentRows[] = $paymentRow;

	mysql_close($conn);
	echo json_encode(array('total' => $totalRow, 'payment' => $paymentRows));
}

// Add
if ($_POST['type'] == 'add') {
	$totalResult = mysql_query("SELECT * FROM 515calc WHERE type = 'total'");
	$totalRow = mysql_fetch_assoc($totalResult);

	$x = $_POST['x'] ? $_POST['x'] : 0;
	$y = $_POST['y'] ? $_POST['y'] : 0;
	$l = $_POST['l'] ? $_POST['l'] : 0;
	$title = $_POST['title'] ? $_POST['title'] : '';
	$dateTime = new DateTime("now", new DateTimeZone('America/New_York'));
	$mysqldate = $dateTime->format("Y-m-d H:i:s");

	mysql_query("INSERT INTO 515calc VALUES(0, '$mysqldate', 'payment', '$title', $x, $y, $l, 0)");
	$currentTotalX = $totalRow['X'] + $x;
	$currentTotalY = $totalRow['Y'] + $y;
	$currentTotalL = $totalRow['L'] + $l;
	mysql_query("UPDATE 515calc SET X = $currentTotalX, Y = $currentTotalY, L = $currentTotalL WHERE type = 'total' ");

	$totalResult = mysql_query("SELECT * FROM 515calc WHERE type = 'total'");
	$totalRow = mysql_fetch_assoc($totalResult);

	$idResult = mysql_query("SELECT id FROM 515calc ORDER BY id DESC LIMIT 1");
	$idRow = mysql_fetch_assoc($idResult);

	mysql_close($conn);
	echo json_encode(array('total' => $totalRow, 'time' => $mysqldate, 'id' => $idRow['id']));
}

if ($_POST['type'] == 'delete') {
	$id = $_POST['id'];
	$paymentResult = mysql_query("SELECT * FROM 515calc WHERE id = $id");
	$paymentRow = mysql_fetch_assoc($paymentResult);
	$x = $paymentRow['X'];
	$y = $paymentRow['Y'];
	$l = $paymentRow['L'];

	$totalResult = mysql_query("SELECT * FROM 515calc WHERE type = 'total'");
	$totalRow = mysql_fetch_assoc($totalResult);

	$currentTotalX = $totalRow['X'] - $x;
	$currentTotalY = $totalRow['Y'] - $y;
	$currentTotalL = $totalRow['L'] - $l;
	mysql_query("UPDATE 515calc SET X = $currentTotalX, Y = $currentTotalY, L = $currentTotalL WHERE type = 'total' ");

	mysql_query("UPDATE 515calc SET processed = 1 WHERE id = $id");

	$totalResult = mysql_query("SELECT * FROM 515calc WHERE type = 'total'");
	$totalRow = mysql_fetch_assoc($totalResult);

	mysql_close($conn);
	echo json_encode(array('total' => $totalRow));
}

if ($_POST['type'] == 'clean') {
	mysql_query("UPDATE 515calc SET X = 0, Y = 0, L = 0 WHERE type = 'total' ");
	mysql_query("UPDATE 515calc SET processed = 1 WHERE type = 'payment' ");
}