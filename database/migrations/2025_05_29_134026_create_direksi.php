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
        Schema::create('tb_direksi', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("nama",255)->nullable(true);
            $table->string("tempat_lahir")->nullable(true);
            $table->date("tgl_lahir")->nullable(true);
            $table->binary("file")->nullable(true);
            $table->string("jabatan")->nullable(true);
            $table->text("deskripsi")->nullable(true);
            $table->string("ext")->nullable(true);
            $table->text("slug")->nullable(false);
            $table->enum("tipe_direksi",["d_direksi","d_komisaris"])->nullable(false);
            $table->float("size")->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_direksi');
    }
};
