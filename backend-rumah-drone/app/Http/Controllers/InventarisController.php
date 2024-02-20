<?php

namespace App\Http\Controllers;

use App\Models\Inventaris;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InventarisController extends Controller
{
    public function create()
    {
        $validator = Validator::make(request()->all(), [
            'namaBarang' => 'required|unique:inventaris',
            'deskripsi' => 'required',
            'harga' => 'required',
            'stock' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        }

        $product = Inventaris::create([
            'namaBarang' => request('namaBarang'),
            'deskripsi' =>  request('deskripsi'),
            'harga' =>  request('harga'),
            'stock' =>  request('stock'),

        ]);

        if ($product) {
            return response()->json(['message' => 'Create Inventaris Success'], 200);
        } else {
            return response()->json(['message' => 'Create Inventaris Failed'], 404);
        }
    }

    public function get()
    {

        $inventaris = Inventaris::get();

        if ($inventaris) {
            return response()->json($inventaris, 200);
        } else {
            return response()->json(['message' => 'Get Inventaris Failed'], 404);
        }
    }

    public function getByID($id)
    {

        $inventaris = Inventaris::where('id', $id)->get();

        if ($inventaris) {
            return response()->json($inventaris, 200);
        } else {
            return response()->json(['message' => 'Get inventaris Failed'], 404);
        }
    }

    public function destroy($id)
    {
        $inventaris = Inventaris::find($id);
        if (!$inventaris) {
            return response()->json(['message' => 'inventaris not found'], 404);
        }

        $inventaris->delete();

        return response()->json(['message' => 'inventaris deleted successfully']);
    }
}
