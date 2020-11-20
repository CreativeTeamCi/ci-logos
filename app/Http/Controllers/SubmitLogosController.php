<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SubmitLogosController extends Controller
{
    //
    public function store (Request $request) {
        //Validation des donnée
        $v = Validator::make($request->all(),[
            ''
        ]);
    }
}
