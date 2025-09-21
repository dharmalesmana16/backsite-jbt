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
        Schema::create('tb_berita', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("nama",255)->nullable();
            $table->text("deskripsi")->nullable();
            $table->string("slug",255);
            $table->string("published_on",255);
            $table->binary("cover")->nullable();
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("tb_berita");
    }
};
