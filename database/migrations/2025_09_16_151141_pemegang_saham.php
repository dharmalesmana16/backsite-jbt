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
        Schema::create('tb_pemegang_saham', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("nama",255)->nullable();
            $table->string("warna",255)->nullable();
            $table->binary("logo")->nullable();
            $table->double("jumlah_saham");
            $table->double("jumlah");
            $table->double("kepemilikan");

            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("tb_pemegang_saham");
    }
};
