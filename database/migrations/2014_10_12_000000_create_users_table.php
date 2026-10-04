<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Brokers (role 2), administrators (role 1) and licensed employees (role 3).
     *
     * Defaults mirror what the application relies on: a user created without
     * a role is a broker, without a status is unverified, and without a
     * subscription type is on the legacy '0' value that the app treats as free.
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();

            // Licensed employees are created without a company URL.
            $table->string('phone_number', 55)->nullable();
            $table->string('company_url')->nullable();
            $table->string('company_logo')->default('No Image');
            $table->string('profile_img')->nullable();

            // 1 = admin, 2 = broker, 3 = licensed employee
            $table->unsignedTinyInteger('role_id')->default(2)->index();
            // 0 = not verified, 1 = active
            $table->unsignedTinyInteger('status')->default(0);

            // 'free', 'annual' or the legacy '0'
            $table->string('subscription_type', 20)->default('0');
            // A number for free users, the string 'unlimited' for annual ones.
            $table->string('credits_left', 20)->nullable();
            $table->unsignedInteger('bought_credits')->nullable()->default(0);
            $table->unsignedInteger('additional_license')->default(0);
            $table->unsignedInteger('total_additional_licenses')->default(0);
            $table->date('next_charge_date')->nullable();

            // One-time tokens that are looked up by value.
            $table->string('verify_code', 100)->nullable()->index();
            $table->string('email_verification_code', 100)->nullable()->index();
            $table->string('reset_password_token', 100)->nullable()->index();
            $table->string('create_password_token', 100)->nullable()->index();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
