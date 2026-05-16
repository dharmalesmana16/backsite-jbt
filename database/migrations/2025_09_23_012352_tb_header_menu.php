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
        Schema::create('tb_header_menu', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->binary("cover")->nullable();
            $table->text("text_left")->nullable();
            $table->text("text_right")->nullable();
            $table->string("bg_color")->nullable();
            $table->foreignId("menu_id")->references('id')->on('tb_menu')->onUpdate('cascade')->onDelete('cascade');

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
