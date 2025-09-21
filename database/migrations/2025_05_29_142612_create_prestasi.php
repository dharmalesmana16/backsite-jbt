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

        Schema::create('prestasi', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("nama",255)->nullable();
            $table->text("deskripsi");
            $table->date("tanggal");
            $table->string("ext",255);
            $table->double("size");
            $table->binary("file");
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prestasi');
    }
};
