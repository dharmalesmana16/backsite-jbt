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
        Schema::create('tb_carousel', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("nama_file",255)->nullable(true);
            $table->binary("file")->nullable(false);
            $table->enum("type_file",["image","video"]);
            $table->enum("is_shown",["yes","no"]);
            $table->text("slug");
            $table->string("ext");
            $table->float("size");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_carousel');
    }
};
