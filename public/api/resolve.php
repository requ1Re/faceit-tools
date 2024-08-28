<?php
$env = parse_ini_file('../../.env');
header('Access-Control-Allow-Origin: '.$env["CORS_FRONTEND_BASE_DOMAIN"]);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');

header('Content-Type: application/json; charset=utf-8');

$apiKey = $env["STEAM_WEB_API_KEY"];

$query = $_GET['query'];

$url = "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=".$apiKey."&vanityurl=".$query."&url_type=1";
$response = file_get_contents($url);
$obj = json_decode($response, true);
$resObj = (object) [
  'success' => $obj["response"]["success"] === 1,
];

if(isset($obj["response"]["steamid"])){
  $resObj->steamId = $obj["response"]["steamid"];
}

echo json_encode($resObj);
