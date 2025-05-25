<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('customers', App\Http\Controllers\Api\CustomerController::class);
Route::apiResource('owners', App\Http\Controllers\Api\OwnerController::class);
Route::apiResource('quotas', App\Http\Controllers\Api\QuotaController::class);
Route::apiResource('stores', App\Http\Controllers\Api\StoreController::class);

Route::get('/test', function () {
    return response()->json(['message' => 'API working']);
});
