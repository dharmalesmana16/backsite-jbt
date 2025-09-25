<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Saham;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SahamController extends Controller
{
    protected $data;
    public function __construct()
    {
        $this->data = new Saham();
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
        $nama = $request->nama;
        $warna = $request->warna;
        $jumlah_saham = $request->jumlah_saham;
        $jumlah = $request->jumlah;
        $kepemilikan = $request->kepemilikan;
        $slug      = Str::slug($nama);
        $dataUpload = [
            "nama" => $nama,
            "jumlah_saham" => $jumlah_saham,
            "jumlah" => $jumlah,
            "kepemilikan" => $kepemilikan,
            "warna"      => $warna,
            "slug"      => $slug,
        ];

        // if ($request->file('gambar_first')) {
        //     $file = $request->file('gambar_first');
        //     $namaFile = Str::slug($nama_golongan)."gambar-1" . "-" . time() . "." . $request->gambar_first->getClientOriginalExtension();
        //     // Storage::disk('public')->put($namaFile, file_get_contents($request->file));
        //     $file->storeAs('image/tarif',$namaFile,'public');
        //     $dataUpload["gambar_first"] = $namaFile;
        // }

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
    public function update(Request $request, string $slug) {
        $post = $this->data::where('slug', $slug)->first();

        $nama = $request->nama;
        $warna = $request->warna;
        $jumlah_saham = $request->jumlah_saham;
        $jumlah = $request->jumlah;
        $kepemilikan = $request->kepemilikan;
        $slug      = Str::slug($nama);
        $dataUpload = [
            "nama" => $nama,
            "jumlah_saham" => $jumlah_saham,
            "jumlah" => $jumlah,
            "kepemilikan" => $kepemilikan,
            "warna"      => $warna,
            "slug"      => $slug,
        ];
        //check if image is not empty
        if ($request->file('logo')) {

            $exists = Storage::disk('public/image/static')->exists("{$post->logo}");
            if ($exists) {
                Storage::disk('public/image/saham')->delete("{$post->logo}");
            }

            $image = $request->file('logo');
            $namaFile = $nama . date("dmY") . "-" . time() . "." . $request->logo->getClientOriginalExtension();

            $image->storeAs('image/saham', $namaFile, 'public');
            $dataUpload["logo"] = $namaFile;
            //upload image
            //update post with new image
        }

        //update post without image
        $res = $post->update($dataUpload);

        if (! $res) {
            return response()->json([
                "msg" => "failed",
            ], 404);
        }
        return response()->json([
            "msg" => "Successs",
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        //code...

        $data = $this->data::where('slug', '=', $slug)->first();
        // return response()->json(["data"=>$request->json("nama_barang")]);
        if ($data->logo) {
            $exists = Storage::disk('public/image/saham')->exists("{$data->gambar_first}");
            if ($exists) {
                Storage::disk('public/image/saham')->delete("{$data->gambar_first}");
            }
        }

        $data->delete();
        return response()->json(["msg" => "Data Berhasil Dihapus"], 201);
    }
}
