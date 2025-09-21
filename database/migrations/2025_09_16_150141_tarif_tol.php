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
          Schema::create('tb_tarif_tol', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("nama",255)->nullable();
            $table->double("harga");
            $table->text("deskripsi")->nullable();
            $table->string("slug",255);
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
                Schema::dropIfExists('tb_tarif_tol');

    }
};
