<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Website extends Model
{
    protected $fillable = ['host', 'page_url', 'method', 'detected_at'];

    public function visits()
    {
        return $this->hasMany(Visit::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'visits');
    }
}
