<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Direksi ;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DireksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     protected $data;
    public function __construct()
    {
        $this->data = new Direksi();
    }
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
        $nama = $request->nama;
        $tempat_lahir = $request->tempat_lahir;
        $tanggal_lahir = $request->tanggal_lahir;
        $tipe_direksi = $request->tipe_direksi;
        $jabatan = $request->jabatan;
        $slug      = Str::slug($nama);

        $dataUpload = [
            "nama" => $nama,
            "tempat_lahir" => $tempat_lahir,
            "tgl_lahir"      => $tanggal_lahir,
            "tipe_direksi"      => $tipe_direksi,
            "jabatan"      => $jabatan,
            "slug"      => $slug,
        ];
        if ($request->has('file')) {
            $file = $request->file;
            $namaFile = Str::slug($nama) . "-". $tipe_direksi . "-" . date("dmY") . "-" . time() . "." . $request->file->getClientOriginalExtension();
            // Storage::disk('public')->put($namaFile, file_get_contents($request->file));
            $file->storeAs('image/direksi',$namaFile,'public');
            $dataUpload["ext"]  = $request->file->getClientOriginalExtension();
            $dataUpload["size"] = number_format($request->file->getSize() / 1048576.2,2);
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
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

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
        if ($data->file) {
            $exists = Storage::disk('public')->exists("{$data->file}");
            if ($exists) {
                Storage::disk('public')->delete("{$data->file}");
            }
        }

        $data->delete();
        return response()->json(["msg" => "Data Berhasil Dihapus"],201);

    }
}
