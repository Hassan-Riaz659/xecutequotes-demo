<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Charge extends Model
{
    protected $fillable = [
        'card_num', 'cvv', 'exp_month', 'month_year'
    ];
}
