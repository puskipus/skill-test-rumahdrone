<?php

namespace App\Http\Controllers;

use App\Models\Inventaris;
use App\Models\Stok;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;

class StokController extends Controller
{
    public function create()
    {

        $validator = Validator::make(request()->all(), [
            'namaBarang' => 'required',
            'jenis' => 'required',
            'keterangan' => 'required',
            'jumlah' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        }

        try {
            $inventaris = Inventaris::where('namaBarang', request()->namaBarang)->first();
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Inventaris Not Found'], 404);
        }

        if (request()->jenis == "Barang Keluar") {
            if ($inventaris->stock - request()->jumlah < 0 ) {
                return response()->json(['error' => 'Stok hanya tersisa ' . $inventaris->stock], 404);
            }
            $inventaris->stock = $inventaris->stock - request()->jumlah;
        } else {
            $inventaris->stock = $inventaris->stock + request()->jumlah;
        }

        $inventaris->update();

        $stok = Stok::create([
            'namaBarang' => request('namaBarang'),
            'jenis' =>  request('jenis'),
            'keterangan' =>  request('keterangan'),
            'jumlah' =>  request('jumlah'),

        ]);

        if ($stok) {
            return response()->json(['message' => 'Create Stok Success'], 200);
        } else {
            return response()->json(['message' => 'Create Stok Failed'], 404);
        }
    }

    public function get()
    {

        $stok = Stok::get();

        if ($stok) {
            return response()->json($stok, 200);
        } else {
            return response()->json(['message' => 'Get Stok Failed'], 404);
        }
    }
}
