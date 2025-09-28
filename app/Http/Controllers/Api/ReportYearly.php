<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        //   $validator = Validator::make($request->all(), [
        //     'file'     => 'required|mimes:pdf',
        //     'nama_file'     => 'required',
        //     'tahun'   => 'required',
        // ]);

        // //check if validation fails
        // if ($validator->fails()) {
        //     return response()->json($validator->errors(), 422);
        // }
        $nama_file = $request->nama_file;
        $deskripsi = $request->deskripsi;
        $url       = $request->url;
        $tahun     = $request->tahun;
        $slug      = Str::slug($nama_file);

        $dataUpload = [
            "nama_file" => $nama_file,
            "deskripsi" => $deskripsi,
            "url"       => $url,
            "tahun"     => $tahun,
            "slug"      => $slug,

        ];
        if ($request->file('file')) {
            $file      = $request->file;
            $namaFile = "file-" . Str::slug($nama_file) . "-" . $tahun . "-" . date("dmY") . "-" . time() . "." . $request->file->getClientOriginalExtension();
            // Storage::disk('public')->put($namaFile, file_get_contents($request->file));
                        $file->storeAs('doc', $namaFile, 'public');

            $dataUpload["ext"]  = $request->file->getClientOriginalExtension();
            $dataUpload["size"] = number_format($request->file->getSize() / 1048576.2, 2);
            $dataUpload["file"] = $namaFile;
        }
        if ($request->file('cover')) {
            $file      = $request->cover;
            $namaCover = "cover-" . Str::slug($nama_file) . "-" . $tahun . "-" . date("dmY") . "-" . time() . "." . $request->cover->getClientOriginalExtension();
            // $namaFile = Str::slug($nama) . "-" . $tipe_direksi . "-" . date("dmY") . "-" . time() . "." . $request->file->getClientOriginalExtension();
            // Storage::disk('public')->put($namaFile, file_get_contents($request->file));
            $file->storeAs('image/report', $namaCover, 'public');
            // Storage::disk('public')->put($namaCover, file_get_contents($request->cover));
            $dataUpload["gambar"] = $namaCover;
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
        //   $validator = Validator::make($request->all(), [
        //     'file'     => 'required|mimes:pdf',
        //     'nama_file'     => 'required',
        //     'tahun'   => 'required',
        // ]);

        // //check if validation fails
        // if ($validator->fails()) {
        //     return response()->json($validator->errors(), 422);
        // }
        $post = $this->data::where("slug","=",$slug)->first();
        $nama_file = $request->nama_file;
        $deskripsi = $request->deskripsi;
        $url       = $request->url;
        $tahun     = $request->tahun;
        $slug      = Str::slug($nama_file);

        $dataUpload = [
            "nama_file" => $nama_file,
            "deskripsi" => $deskripsi,
            "url"       => $url,
            "tahun"     => $tahun,
            "slug"      => $slug,

        ];
        if ($request->file('file')) {
            $namaFile = "file-" . Str::slug($nama_file) . "-" . $tahun . "-" . date("dmY") . "-" . time() . "." . $request->file->getClientOriginalExtension();
            Storage::disk('public')->put($namaFile, file_get_contents($request->file));
             $exists = Storage::disk('public/doc')->exists("{$post->file}");
            if ($exists) {
                Storage::disk('public/doc')->delete("{$post->file}");
            }
            $dataUpload["ext"]  = $request->file->getClientOriginalExtension();
            $dataUpload["size"] = number_format($request->file->getSize() / 1048576.2, 2);
            $dataUpload["file"] = $namaFile;
        }
        if ($request->file('cover')) {
            $file      = $request->cover;
            $namaCover = "cover-" . Str::slug($nama_file) . "-" . $tahun . "-" . date("dmY") . "-" . time() . "." . $request->cover->getClientOriginalExtension();
            // $namaFile = Str::slug($nama) . "-" . $tipe_direksi . "-" . date("dmY") . "-" . time() . "." . $request->file->getClientOriginalExtension();
            // Storage::disk('public')->put($namaFile, file_get_contents($request->file));
            $exists = Storage::disk('public/image/report')->exists("{$post->gambar}");
            if ($exists) {
                Storage::disk('public/image/report')->delete("{$post->gambar}");
            }
            $file->storeAs('image/report', $namaCover, 'public');
            // Storage::disk('public')->put($namaCover, file_get_contents($request->cover));
            $dataUpload["gambar"] = $namaCover;
        }
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
        if ($data->gambar) {
            $exists = Storage::disk('public/image/report')->exists("{$data->gambar}");
            if ($exists) {
                Storage::disk('public/image/report')->delete("{$data->gambar}");
            }
        }
        $data->delete();
        return response()->json(["msg" => "Data Berhasil Dihapus"], 201);
    }
}
