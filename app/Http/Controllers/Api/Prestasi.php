<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prestasi as ModelPrestasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class Prestasi extends Controller
{
    protected $data;
    public function __construct()
    {
        $this->data = new ModelPrestasi();
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
         $validator = Validator::make($request->all(), [
            'nama'   => 'required',
            'file'   => 'mimes:png',
            // 'content'   => 'required',
        ], [
            'nama.required'   => 'Nama Prestasi Harus diisi ya !',
            'file.mimes'      => "Format yang diperbolehkan : png",
        ]);
         if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $nama = $request->nama;
        $tanggal = $request->tanggal;
        $deskripsi = $request->deskripsi;
        $slug      = Str::slug($nama);

        $dataUpload = [
            "nama" => $nama,
            "deskripsi" => $deskripsi,
            "tanggal"      => $tanggal,
            "slug"      => $slug,

        ];
        if ($request->has('file')) {
            $file = $request->file;
            $namaFile = Str::slug($nama) . "-prestasi-" . date("dmY") . "-" . time() . "." . $file->getClientOriginalExtension();
            $file->storeAs('image/prestasi', $namaFile, 'public');
            $imageSize = getimagesize($file);
            $dataUpload["width"] = $imageSize[0];
            $dataUpload["height"] = $imageSize[1];
            $dataUpload["ext"]  = $request->file->getClientOriginalExtension();
            $dataUpload["size"] = number_format($request->file->getSize() / 1048576.2, 2);
            $dataUpload["file"] = $namaFile;
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
    public function show(string $id)
    {
        $data = $this->data::where("id", $id)->first();
        return response()->json([
            "msg"  => "success",
            "data" => $data,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $slug)
    {
        $post = $this->data::where('slug', '=', $slug)->first();
        $nama = $request->nama;
        $tanggal = $request->tanggal;
        $deskripsi = $request->deskripsi;
        $slug      = Str::slug($nama);

        $dataUpload = [
            "nama" => $nama,
            "deskripsi" => $deskripsi,
            "tanggal"      => $tanggal,
            "slug"      => $slug,

        ];
        //check if image is not empty
        if ($request->file('file')) {

            $exists = Storage::disk('public/image/prestasi')->exists("{$post->file}");
            if ($exists) {
                Storage::disk('public/image/prestasi')->delete("{$post->file}");
            }

            $image = $request->file('file');
            $namaFile = $slug . date("dmY") . "-" . time() . "." . $request->file->getClientOriginalExtension();

            $image->storeAs('image/prestasi', $namaFile, 'public');
            $dataUpload["file"] = $namaFile;
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
            "msg" => "Success",
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
        if ($data->file) {
            $exists = Storage::disk('public')->exists("{$data->file}");
            if ($exists) {
                Storage::disk('public')->delete("{$data->file}");
            }
        }

        $data->delete();
        return response()->json(["msg" => "Data Berhasil Dihapus"], 201);
    }
}
