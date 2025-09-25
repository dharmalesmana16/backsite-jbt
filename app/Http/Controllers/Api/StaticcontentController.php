<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Staticcontent;
// use App\Models\Prestasi as ModelPrestasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StaticcontentController extends Controller
{
    protected $data;
    public function __construct()
    {
        $this->data = new Staticcontent();
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
            $namaFile = Str::slug($nama) . "-prestasi-" . date("dmY") . "-" . time() . "." . $request->file->getClientOriginalExtension();
            $file->storeAs('image/prestasi', $namaFile, 'public');
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
    public function show(string $slug)
    {
        $data = $this->data::where("judul_static_content", $slug)->first();
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
    public function update(Request $request, string $judul_static_content)
    {
        $post = $this->data::where('judul_static_content', $judul_static_content)->first();
        // $judul_cover_berita = $request->judul_cover_berita;
        // $tanggal = $request->tanggal;
        $text_header = $request->text_header;
        $bg_color = $request->bg_color;
        $text_sub_header = $request->text_sub_header;
        // $slug      = Str::slug("informasi-berita");
        $judul_static_content = $request->judul_static_content;
        $dataUpload = [
            "text_header" => $text_header,
            "bg_color" => $bg_color,
            "text_sub_header"      => $text_sub_header,
            "judul_static_content" => $judul_static_content

        ];
        //check if image is not empty
        if ($request->file('cover')) {

            $exists = Storage::disk('public/image/static')->exists("{$post->cover}");
            if ($exists) {
                Storage::disk('public/image/static')->delete("{$post->cover}");
            }

            $image = $request->file('cover');
            $namaFile = $judul_static_content . date("dmY") . "-" . time() . "." . $request->cover->getClientOriginalExtension();

            $image->storeAs('image/static', $namaFile, 'public');
            $dataUpload["cover"] = $namaFile;
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
