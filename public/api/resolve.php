<?php
header('Content-Type: application/json; charset=utf-8');

$env = parse_ini_file('../../.env');
$apiKey = $env["STEAM_WEB_API_KEY"];

$query = $_GET['query'];

$url = "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=".$apiKey."&vanityurl=".$query."&url_type=1";
$response = file_get_contents($url);
$obj = json_decode($response, true);
$resObj = (object) [
  'success' => $obj["response"]["success"] === 1,
  'steamId' => $obj["response"]["steamid"]
];

echo json_encode($resObj);
