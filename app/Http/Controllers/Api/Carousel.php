<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Carousel extends Controller
{
    protected $data;
    public function __construct()
    {
        $this->data = new \App\Models\Carousel();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = $this->data::all();
        return response()->json([
            "msg"  => "success",
            "data" => $data,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $nama_file = $request->nama_file;
        $type_file = "image";
        $slug      = Str::slug($nama_file);

        $dataUpload = [
            "nama_file" => $nama_file,
            "type_file" => $type_file,
            "slug"      => $slug,

        ];
        if ($request->file('file_carousel')) {
            $file = $request->file_carousel;

            $namaFile = Str::slug($nama_file) . "-carousel-" . date("dmY") . "-" . time() . "." . $request->file_carousel->getClientOriginalExtension();
            $file->storeAs('image/carousel', $namaFile, 'public');
            $dataUpload["ext"]  = $request->file_carousel->getClientOriginalExtension();
            $dataUpload["size"] = $request->file_carousel->getSize() / 1048576.2;
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
        $data = $this->data::where("slug", $slug)->first();
        return response()->json([
            "msg"  => "success",
            "data" => $data,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $slug)
    {
        $post = $this->data::where('slug', '=', $slug)->first();
        $nama = $request->nama_file;
        $slug      = Str::slug($nama);

        $dataUpload = [
            "nama_file" => $nama,

        ];
        //check if image is not empty
        if ($request->file('file')) {

            $exists = Storage::disk('public/image/carousel')->exists("{$post->file}");
            if ($exists) {
                Storage::disk('public/image/carousel')->delete("{$post->file}");
            }

            $image = $request->file('file');
            $namaFile = $slug . date("dmY") . "-" . time() . "." . $request->file->getClientOriginalExtension();

            $image->storeAs('image/carousel', $namaFile, 'public');
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
