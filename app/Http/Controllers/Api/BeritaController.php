<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    protected $data;
    public function __construct()
    {
        $this->data = new Berita();
    }
    public function index()
    {
        $res = $this->data::all();
        return response()->json([
            "msg" => "Success",
            "data" => $res
        ], 200);
    }
    public function store(Request $request)
    {
        $nama = $request->judul;
        $deskripsi = $request->deskripsi;
        $published_on = $request->published_on;
        $tanggal = $request->tanggal;
        $slug      = Str::slug($nama);
        $dataUpload = [
            "judul" => $nama,
            "deskripsi"      => $deskripsi,
            "published_on"      => $published_on,
            "tanggal"      => $tanggal,
            "slug"      => $slug,
        ];

        if ($request->file('cover')) {
            $file = $request->file('cover');
            $namaFile = Str::slug($nama) . "gambar-1" . "-" . time() . "." . $request->cover->getClientOriginalExtension();
            // Storage::disk('public')->put($namaFile, file_get_contents($request->file));
            $file->storeAs('image/berita', $namaFile, 'public');
            $dataUpload["cover"] = $namaFile;
        }
        if ($request->file('gambar_kedua')) {
            $file = $request->file('gambar_kedua');
            $namaFile = Str::slug($nama) . "gambar-2" . "-" . time() . "." . $request->gambar_kedua->getClientOriginalExtension();
            // Storage::disk('public')->put($namaFile, file_get_contents($request->file));
            $file->storeAs('image/berita', $namaFile, 'public');
            $dataUpload["gambar_kedua"] = $namaFile;
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
    public function update(Request $request, string $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        //code...

        $data = $this->data::where('slug', '=', $slug)->first();
        // return response()->json(["data"=>$request->json("nama_barang")]);
        if ($data->cover || $data->gambar_kedua) {
            $exists = Storage::disk('public/image/berita')->exists("{$data->cover}");
            if ($exists) {
                Storage::disk('public/image/berita')->delete("{$data->cover}");
                Storage::disk('public/image/berita')->delete("{$data->gambar_kedua}");
            }
        }

        $data->delete();
        return response()->json(["msg" => "Data Berhasil Dihapus"], 201);
    }
}
