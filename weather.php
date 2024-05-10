<?php

$city = htmlspecialchars($_GET['city']);

$url = "http://api.openweathermap.org/data/2.5/weather?q=$city&units=metric&appid=82adfbef340bebf3b5b13e2671412e30";
$response = file_get_contents($url);

echo $response;

?>