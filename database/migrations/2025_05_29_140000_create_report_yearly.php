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
        Schema::create('tb_report_yearly', function (Blueprint $table) {
           $table->id()->autoIncrement();
            $table->string("nama_file",255)->nullable(true);
            $table->binary("file")->nullable(false);
            $table->binary("gambar")->nullable(true);
            $table->string("ext")->nullable(true);
            $table->float("size")->nullable(true);
            $table->text("slug")->nullable(false);
            $table->text("deskripsi")->nullable(false);
            $table->year("tahun")->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_report_yearly');
    }
};
