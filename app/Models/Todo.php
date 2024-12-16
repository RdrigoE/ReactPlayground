<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    public $fillable = [
        'name',
        'status'
    ];

    public $casts = [
        'status' => TodoStatus::class,
    ];
}
