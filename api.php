<?php
// Load API Key from Config File
$config = parse_ini_file("config.ini");
$apiKey = $config["api_key"];

// API-URL
$url = 'https://kgsearch.googleapis.com/v1/entities:search';

// Query Param
$query = $_GET['query'];
$limit = $_GET['limit'];
$indent = $_GET['indent'];
$languages = $_GET['languages'];

// API-Query
$params = http_build_query([
  'query' => $query,
  'key' => $apiKey,
  'limit' => $limit,
  'indent' => $indent,
  'languages' => $languages
]);
$requestUrl = "$url?$params";

// Sent API Query and return response
$response = file_get_contents($requestUrl);
header('Content-Type: application/json');
echo $response;
