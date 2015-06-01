<?php
session_start();
//$ConexaoSQL = mysql_connect("localhost", "root", "1478963") or $erro="Nao foi possivel Conectar!";

$ConexaoSQL = mysql_connect("mysql01.multpoint1.hospedagemdesites.ws", "multpoint11", "joaoc502") or $erro="Nao foi possivel Conectar!";
if (!mysql_select_db("multpoint11", $ConexaoSQL)) {
	die("naoi conectou");
}

if( $_GET["acao"] == "getScore"){
	$result = mysql_query("SELECT * FROM score ORDER By score DESC LIMIT 10");
	if(mysql_num_rows($result))
		while($r = mysql_fetch_array($result)){
			$cont[] =  $r;
		}

	print "<table>
						<tr>
							<td style=\"width: 60%; text-align: left\">
							NAME
							</td>
							<td style=\"width: 40%\">
							SCORE
							</td>
						</tr>";

	for($i=0; $i<count($cont); $i++){
		print	"<tr>
							<td style=\"text-align: left\">
							".($i+1)."-".$cont[$i]["name"]."
							</td>
							<td>
							".$cont[$i]["score"]."
							</td>
						</tr>";
	}
	
	print "</table>";
}else if( $_POST["acao"] == "sve"){
	$difTime = time() - $_SESSION['PHPIT'];
	$range = false;
	print $_SESSION['score']; print " - ".$difTime;
	if( $_SESSION['score'] < 3000 && $difTime > 50 ){
		$range  = true;
	}else if( $_SESSION['score'] < 15000 && $difTime > 500 ){
		$range  = true;
	}else if( $_SESSION['score'] < 150000 && $difTime > 2000 ){
		$range  = true;
	}else if( $_SESSION['score'] < 1000000 && $difTime > 4000 ){
		$range  = true;
	}else if( $_SESSION['score'] < 5000000 && $difTime > 6000 ){
		$range  = true;
	}else if( $_SESSION['score'] < 50000000 && $difTime > 10000 ){
		$range  = true;
	}

	if( $_POST["nameTxt"] != "" && $_POST["score"] > 0 && $range ){
		mysql_query("INSERT INTO score (name, score, ip, date, playTime, wave) VALUES('".$_POST["nameTxt"]."', '".$_SESSION['score']."', '".$_SERVER['REMOTE_ADDR']."', NOW(), '".$difTime."', '".$_POST["wave"]."')");
	}

}else if( $_POST["acao"] == "PHPSC"){
	if( $_SESSION['score'] == "" || $_SESSION['score'] == 0 ){
		$_SESSION['score'] = 0;
		$_SESSION['lastU'] = time();
		print "init";
	}
	$difTime = time() - $_SESSION['lastU'];
	print  $difTime;
	if( $difTime > 8 || $difTime == 0 ){
		$_SESSION['lastU'] = time();
		$dif = $_POST["scre"] - $_SESSION['score'];
	
		if( $dif > 1500 ){
			$_SESSION['score'] = $_SESSION['score'];
		}else{
			$_SESSION['score'] = $_POST["scre"];
			
		}
	}
	
	print_r($_SESSION);

}else if( $_POST["acao"] == "invo"){
	$_SESSION['PHPIT'] = time();
	
}

?>

