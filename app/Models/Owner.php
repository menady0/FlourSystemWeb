<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    protected $fillable = ['name', 'username', 'password'];

    public function customers()
    {
        return $this->hasMany(Customer::class, 'OwnerID');
    }

    public function quotas()
    {
        return $this->hasMany(Quota::class, 'OwnerID');
    }
}
