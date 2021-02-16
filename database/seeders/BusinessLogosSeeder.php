<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BusinessLogo;

class BusinessLogosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // - Généré 30 donnée
        BusinessLogo::factory(30)->create();

        // - Ajouter Cretive Team
    }
}
