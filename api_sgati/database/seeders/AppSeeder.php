<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AppSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AssetsSeeders::class,
            EmployeesSeeder::class,
        ]);
    }
}
