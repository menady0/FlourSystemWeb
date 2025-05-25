<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $primaryKey = 'CustomerID';
    public $incrementing = false;

    protected $fillable = [
        'CustomerID', 'OwnerName', 'NumberOfPeople', 'TotalQuantity', 'Price',
        'Registration', 'Delivered', 'RenewalDate', 'customerIndex', 'OwnerID'
    ];

    public function owner()
    {
        return $this->belongsTo(Owner::class, 'OwnerID');
    }

    public function stores()
    {
        return $this->hasMany(Store::class, 'CustomerID');
    }
}
