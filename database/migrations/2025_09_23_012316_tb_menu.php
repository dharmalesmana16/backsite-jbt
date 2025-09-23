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
        Schema::create('tb_menu', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("nama_perusahaan", 255);
            $table->string("deskripsi", 255)->nullable();
            $table->binary("logo")->nullable();
            $table->string("alamat_perusahaan")->nullable();
            $table->string("email_perusahaan")->nullable();
            $table->string("url_maps")->nullable();
            $table->string("no_telp")->nullable();
            $table->string("call_center")->nullable();
            $table->time("jam_buka")->nullable();
            $table->time("jam_tutup")->nullable();
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
