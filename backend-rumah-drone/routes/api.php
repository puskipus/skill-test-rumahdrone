<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InventarisController;
use App\Http\Controllers\StokController;
use App\Models\Stok;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register'])->middleware('admin');
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group(['middleware' => ['api'], 'prefix' => 'inventaris'], function ($router) {
    Route::get('/', [InventarisController::class, 'get']);

    Route::middleware(['role:admin'])->group(function () {
        Route::post('/', [InventarisController::class, 'create']);
        Route::get('/{id}', [InventarisController::class, 'getByID']);
        Route::delete('/{id}', [InventarisController::class, 'destroy']);
        Route::post('/update/{id}', [InventarisController::class, 'update']);
    });
});

Route::group(['middleware' => ['api'], 'prefix' => 'stok'], function ($router) {
    Route::get('/', [InventarisController::class, 'get']);

    Route::middleware(['role:staff'])->group(function () {
        Route::post('/', [StokController::class, 'create']);
        Route::get('/{id}', [InventarisController::class, 'getByID']);
        Route::delete('/{id}', [InventarisController::class, 'destroy']);
        Route::post('/update/{id}', [InventarisController::class, 'update']);
    });
});

