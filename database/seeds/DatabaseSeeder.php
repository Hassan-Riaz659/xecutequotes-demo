<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Use `php artisan migrate:fresh --seed` to rebuild the demo database. The
     * accounts are listed in PersonaSeeder; they all use the password
     * Password123!. Set DEMO_TODAY=YYYY-MM-DD to pin the date that the demo
     * data is relative to.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            ReferenceDataSeeder::class,
            PassportClientSeeder::class,
            DemoDataSeeder::class,
        ]);
    }
}
