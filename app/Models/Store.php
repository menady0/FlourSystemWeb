<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $fillable = ['DateOfOperation', 'MoneyPaid', 'theReceivedQuantity', 'theDeliveredQuantity', 'CustomerID'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'CustomerID');
    }
}
