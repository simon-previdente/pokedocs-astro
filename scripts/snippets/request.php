<?php

$request = curl_init('__REQUEST_URL__');
curl_setopt_array($request, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FAILONERROR => true,
    CURLOPT_TIMEOUT => 15,
]);

$response = curl_exec($request);
if ($response === false) {
    $error = curl_error($request);
    curl_close($request);
    throw new RuntimeException($error);
}
curl_close($request);

$data = json_decode($response, true, 512, JSON_THROW_ON_ERROR);
echo json_encode($data, JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR), PHP_EOL;
