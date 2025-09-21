<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
class ReportYearly extends Controller
{
     protected $data;
    public function __construct()
    {
        $this->data = new \App\Models\ReportYearly();
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
          $validator = Validator::make($request->all(), [
            'file'     => 'required|mimes:pdf',
            'nama_file'     => 'required',
            'tahun'   => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $nama_file = $request->nama_file;
        $deskripsi = $request->deskripsi;
        $tahun = $request->tahun;
        $slug      = Str::slug($nama_file);

        $dataUpload = [
            "nama_file" => $nama_file,
            "deskripsi" => $deskripsi,
            "tahun"      => $tahun,
            "slug"      => $slug,

        ];
        if ($request->has('file')) {
            $namaFile = "file-".Str::slug($nama_file) . "-". $tahun . "-" . date("dmY") . "-" . time() . "." . $request->file->getClientOriginalExtension();
            Storage::disk('public')->put($namaFile, file_get_contents($request->file));
            $dataUpload["ext"]  = $request->file->getClientOriginalExtension();
            $dataUpload["size"] = number_format($request->file->getSize() / 1048576.2,2);
            $dataUpload["file"] = $namaFile;
        }
        if ($request->has('file')) {
            $namaGambar = "cover-".Str::slug($nama_file) . "-". $tahun . "-" . date("dmY") . "-" . time() . "." . $request->file->getClientOriginalExtension();
            Storage::disk('public')->put($namaGambar, file_get_contents($request->file));
            $dataUpload["gambar"] = $namaGambar;
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {

          $data = $this->data::where('slug', '=', $slug)->first();
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
