<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InventarisController;
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

Route::group(['middleware' => ['api', 'role:admin'], 'prefix' => 'inventaris'], function ($router) {
    Route::post('/', [InventarisController::class, 'create']);
    Route::get('/', [InventarisController::class, 'get']);
    Route::get('/{id}', [InventarisController::class, 'getByID']);
    Route::delete('/{id}', [InventarisController::class, 'destroy']);
});

