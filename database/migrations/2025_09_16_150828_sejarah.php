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
          Schema::create('tb_sejarah', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("judul",255)->nullable();
            $table->text("deskripsi")->nullable();
            $table->string("slug",255);
            $table->year("tahun")->nullable();
            $table->date("tanggal")->nullable();
            $table->string("published_on",255);
            $table->binary("gambar_first")->nullable();
            $table->binary("gambar_second")->nullable();
            $table->binary("gambar_third")->nullable();
            $table->binary("gambar_fourth")->nullable();
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("tb_sejarah");
    }
};
