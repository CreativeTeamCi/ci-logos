<?php

namespace App\Http\Controllers;

use App\Mail\SubmissionMail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.soumission.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input=$request->all();
        $validator=Validator::make($input,
            [
                'nom'  =>'required|string',
                'email'  =>'required|email',
                'business_name'  =>'required|string',
                'file_svg'  =>'required|file|mimes:svg',
                'file_png'  =>'required|file|mimes:png'
            ],
            [
                'nom'  =>"Veuillez saisir le nom svp",
                'email'  =>"Veuillez saisir une adresse email valide",
                'business_name'  =>"Veuillez saisir une adresse email valide",
                'file_svg'  =>"Veuillez uploadé un fichier au format svg",
                'file_png'  =>"Veuillez uploadé un fichier au format png"
            ]
        );

        // if($validator->fails()) return $this->sendError($this->arrayToChaine($validator->errors()->messages()), null);

        $request['nom'] = "Alhassane";
        Mail::to('alhassanesoro96@gmail.com')
        ->send(new SubmissionMail($request->except('_token')));

        return view('pages.accueil.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
