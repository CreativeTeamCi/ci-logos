<?php

namespace Database\Seeders;

use App\Models\ActivityArea;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ActivityAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $data=[
            'Agroalimentaire',
            'Banque / Assurance',
            'Bois / Papier / Carton / Imprimerie',
            'BTP / Matériaux de construction',
            'Chimie / Parachimie',
            'Commerce / Négoce / Distribution',
            'Édition / Communication / Multimédia',
            'Électronique / Électricité',
            'Études et conseils',
            'Industrie pharmaceutique',
            'Informatique / Télécoms',
            'Machines et équipements / Automobile',
            'Métallurgie / Travail du métal',
            'Plastique / Caoutchouc',
            'Services aux entreprises',
            'Textile / Habillement / Chaussure',
            'Transports / Logistique',
        ];
        //Uploading in Database
        foreach ($data as $activity) {
            ActivityArea::create([
                'libelle'   =>$activity,
                'slug'      =>Str::slug($activity)
            ]);
        }
    }
}
