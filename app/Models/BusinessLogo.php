<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessLogo extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'business_name',
        'activity_areas_id',
        'email',
        'logo_png',
        'logo_svg',
        'status',
        'url'
    ];
}
