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
        Schema::create('tb_config_web', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("bg_color_nav")->nullable();
            $table->string("bg_color_footer")->nullable();
            $table->string("text_color_nav")->nullable();
            $table->string("text_color_footer")->nullable();
            $table->string("text_color_header")->nullable();
            $table->string("text_color_sub_header")->nullable();
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
