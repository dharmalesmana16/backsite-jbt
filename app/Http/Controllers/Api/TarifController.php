<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Tarif;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TarifController extends Controller
{
    protected $data;
    public function __construct(){
        $this->data = new Tarif();
    }
    public function index(){
        $res = $this->data::all();
        return response()->json([
            "msg"=>"Success",
            "data"=>$res
        ],200);

    }
    public function store(Request $request)
    {
        $nama_golongan = $request->nama_golongan;
        $harga = $request->harga;
        $deskripsi = $request->deskripsi;
        $slug      = Str::slug($nama_golongan);
        $dataUpload = [
            "nama" => $nama_golongan,
            "deskripsi" => $deskripsi,
            "harga"      => $harga,
            "slug"      => $slug,
        ];

        if ($request->file('gambar_first')) {
            $file = $request->file('gambar_first');
            $namaFile = Str::slug($nama_golongan)."gambar-1" . "-" . time() . "." . $request->gambar_first->getClientOriginalExtension();
            // Storage::disk('public')->put($namaFile, file_get_contents($request->file));
            $file->storeAs('image/tarif',$namaFile,'public');
            $dataUpload["gambar_first"] = $namaFile;
        }
        if ($request->file('gambar_second')) {
            $file = $request->file('gambar_second');
            $namaFile = Str::slug($nama_golongan)."gambar-2" . "-" . time() . "." . $request->gambar_second->getClientOriginalExtension();
            // Storage::disk('public')->put($namaFile, file_get_contents($request->file));
            $file->storeAs('image/tarif',$namaFile,'public');
            $dataUpload["gambar_second"] = $namaFile;
        }
        if ($request->file('gambar_third')) {
            $file = $request->file('gambar_third');
            $namaFile = Str::slug($nama_golongan)."gambar-3" . "-" . time() . "." . $request->gambar_third->getClientOriginalExtension();
            // Storage::disk('public')->put($namaFile, file_get_contents($request->file));
            $file->storeAs('image/tarif',$namaFile,'public');
            $dataUpload["gambar_third"] = $namaFile;
        }
        if ($request->file('gambar_fourth')) {
            $file = $request->file('gambar_fourth');
            $namaFile = Str::slug($nama_golongan)."gambar-4" . "-" . time() . "." . $request->gambar_fourth->getClientOriginalExtension();
            // Storage::disk('public')->put($namaFile, file_get_contents($request->file));
            $file->storeAs('image/tarif',$namaFile,'public');
            $dataUpload["gambar_fourth"] = $namaFile;
        }
        $res = $this->data::create($dataUpload);
        if (! $res) {
            return response()->json([
                "msg" => "failed",
            ], 404);
        }
        return response()->json([
            "msg" => "Success",
        ], 201);

    }
    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $data = $this->data::where("slug", $slug)->first();
        return response()->json([
            "msg"  => "success",
            "data" => $data,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        //code...

        $data = $this->data::where('slug', '=', $slug)->first();
        // return response()->json(["data"=>$request->json("nama_barang")]);
        if ($data->gambar_first || $data->gambar_second || $data->gambar_third || $data->gambar_fourth) {
            $exists = Storage::disk('public/image/tarif')->exists("{$data->gambar_first}");
            if ($exists) {
                Storage::disk('public/image/tarif')->delete("{$data->gambar_first}");
                Storage::disk('public/image/tarif')->delete("{$data->gambar_second}");
                Storage::disk('public/image/tarif')->delete("{$data->gambar_third}");
                Storage::disk('public/image/tarif')->delete("{$data->gambar_fourth}");
            }
        }

        $data->delete();
        return response()->json(["msg" => "Data Berhasil Dihapus"],201);

    }
}
