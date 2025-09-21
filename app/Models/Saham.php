<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Saham extends Model
{
     protected $table = 'tb_pemegang_saham';
    protected $guarded = [];
    public $timestamps = true;
}
