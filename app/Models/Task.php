<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'status',
    ];

    protected $casts = [
        'status' => TodoStatus::class,
    ];
}