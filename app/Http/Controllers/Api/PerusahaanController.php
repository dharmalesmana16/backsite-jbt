<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InformasiPerusahaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PerusahaanController extends Controller
{
    protected $data;
    public function __construct()
    {
        $this->data = new InformasiPerusahaan();
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
        $nama_perusahaan = $request->nama_perusahaan;
        $alamat_perusahaan = $request->alamat_perusahaan;
        $email_perusahaan = $request->email_perusahaan;
        $no_telp = $request->no_telp;
        $call_center = $request->call_center;
        $url_maps = $request->url_maps;
        $deskripsi = $request->deskripsi;
        $jam_buka = $request->jam_buka;
        $jam_tutup = $request->jam_tutup;
        $slug      = Str::slug($nama_perusahaan);

        $dataUpload = [
            "nama_perusahaan" => $nama_perusahaan,
            "deskripsi" => $deskripsi,
            "alamat_perusahaan"      => $alamat_perusahaan,
            "email_perusahaan"      => $email_perusahaan,
            "url_maps"      => $url_maps,
            "no_telp"      => $no_telp,
            "call_center"      => $call_center,
            "slug"      => $slug,

        ];
        if ($request->file('logo')) {
            $file = $request->logo;
            $namaFile = "logo" . date("dmY") . "-" . time() . "." . $request->logo->getClientOriginalExtension();
            $file->storeAs('image/resourcecompany', $namaFile, 'public');
            // $dataUpload["ext"]  = $request->logo->getClientOriginalExtension();
            // $dataUpload["size"] = number_format($request->logo->getSize() / 1048576.2, 2);
            $dataUpload["logo"] = $namaFile;
        }
        $res = $this->data::create($dataUpload);
        if (!$res) {
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
    public function update(Request $request, $slug)
    {

        $post = $this->data::find($slug);
        if ($request->file("file_struktur_organisasi")) {
            $exists = Storage::disk('public/image/resourcecompany')->exists("{$post->struktur_organisasi}");
            if ($exists) {
                Storage::disk('public/image/resourcecompany')->delete("{$post->struktur_organisasi}");
            }
            $image = $request->file('file_struktur_organisasi');
            $namaFile = "gambar_so" . date("dmY") . "-" . time() . "." . $request->file_struktur_organisasi->getClientOriginalExtension();
            $image->storeAs('image/resourcecompany', $namaFile, 'public');
            $res = $post->update([
                'nama_perusahaan'     => $request->nama_perusahaan,
                'alamat_perusahaan'   => $request->alamat_perusahaan,
                'no_telp'   => $request->no_telp,
                'call_center'   => $request->call_center,
                'deskripsi'   => $request->deskripsi,
                'email_perusahaan'   => $request->email_perusahaan,
                'url_maps'   => $request->url_maps,
                'struktur_organisasi' => $namaFile,
                'slug'   => Str::slug($request->nama_perusahaan),
            ]);
        }
        //check if image is not empty
        if ($request->file('logo')) {
            $exists = Storage::disk('public/image/resourcecompany')->exists("{$post->logo}");
            if ($exists) {
                Storage::disk('public/image/resourcecompany')->delete("{$post->logo}");
            }
            $image = $request->file('logo');
            $namaFile = "logo" . date("dmY") . "-" . time() . "." . $request->logo->getClientOriginalExtension();

            $image->storeAs('image/resourcecompany', $namaFile, 'public');

            //upload image
            //update post with new image
            $res = $post->update([
                'logo'     => $namaFile,
                'nama_perusahaan'     => $request->nama_perusahaan,
                'alamat_perusahaan'   => $request->alamat_perusahaan,
                'no_telp'   => $request->no_telp,
                'call_center'   => $request->call_center,
                'deskripsi'   => $request->deskripsi,
                'email_perusahaan'   => $request->email_perusahaan,
                'url_maps'   => $request->url_maps,
                'slug'   => Str::slug($request->nama_perusahaan),
            ]);
        } else {

            //update post without image
            $res = $post->update([
                'nama_perusahaan'     => $request->nama_perusahaan,
                'alamat_perusahaan'   => $request->alamat_perusahaan,
                'no_telp'   => $request->no_telp,
                'call_center'   => $request->call_center,
                'deskripsi'   => $request->deskripsi,
                'email_perusahaan'   => $request->email_perusahaan,
                'url_maps'   => $request->url_maps,
                'slug'   => Str::slug($request->nama_perusahaan),
            ]);

            // $post->nama_perusahaan = $request->nama_perusahaan;
            // $post->slug = Str::slug($request->nama_perusahaan);
            // $res = $post->save();
        }
        if (!$res) {
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
