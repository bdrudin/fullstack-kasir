<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TransactionDetails;


class Transaction extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function details()
    {
        return $this->hasMany(TransactionDetails::class);
    }
}
