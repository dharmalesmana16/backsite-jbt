<?php

use App\Http\Controllers\Api\Carousel;
use App\Http\Controllers\Api\DireksiController;
use App\Http\Controllers\Api\Prestasi;
use App\Http\Controllers\Api\ReportYearly;
use App\Http\Controllers\Api\SahamController;
use App\Http\Controllers\Api\StaticContentController;
use App\Http\Controllers\Api\TarifController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::apiResource("/carousel",Carousel::class);
Route::apiResource("/direksi",DireksiController::class);
Route::apiResource("/report/yearly",ReportYearly::class);
Route::apiResource("/tarif",TarifController::class);
Route::apiResource("/prestasi",Prestasi::class);
Route::apiResource("/saham",SahamController::class);
Route::apiResource("/static/image",StaticContentController::class);
