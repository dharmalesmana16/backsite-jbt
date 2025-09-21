<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_informasi_perusahaan', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("nama_perusahaan", 255)->nullable();
            $table->string("deskripsi", 255)->nullable();
            $table->binary("logo")->nullable();
            $table->string("alamat_perusahaan");
            $table->string("email_perusahaan");
            $table->string("url_maps");
            $table->string("no_telp");
            $table->string("call_center");
            $table->time("jam_buka");
            $table->time("jam_tutup");
            $table->timestampsTz();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
