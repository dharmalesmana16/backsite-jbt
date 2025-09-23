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
        Schema::create('tb_static_content', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->binary("cover")->nullable();
            $table->binary("bg_color")->nullable();
            $table->binary("text_header")->nullable();
            $table->string("text_sub_header")->nullable();
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
