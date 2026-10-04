<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'code', 'phone_number', 'company_url', 'password', 'reset_password_token','subscription_type','credits_left','additional_license'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
        // One-time tokens that give access to an account: never part of a JSON response.
        'verify_code', 'email_verification_code', 'reset_password_token', 'create_password_token',
    ];
}
