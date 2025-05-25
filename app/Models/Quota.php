<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quota extends Model
{
    protected $fillable = ['Amount', 'AmountPerKG', 'DateReceived', 'OwnerID'];

    public function owner()
    {
        return $this->belongsTo(Owner::class, 'OwnerID');
    }
}
