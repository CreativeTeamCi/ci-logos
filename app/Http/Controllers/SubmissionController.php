<?php

namespace App\Http\Controllers;

use App\Mail\SubmissionMail;
use App\Models\Submission;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

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

        if($validator->fails()) return $this->sendError($this->arrayToChaine($validator->errors()->messages()), null);

        $request['status'] = "soumis";
        $data = Submission::create([
            'name'          =>$request->name,
            'email'         =>$request->email,
            'business_name' =>$request->business_name,
            'file_svg'     =>$this->uploadPieceJointe($request->photo_svg,$request->business_name,'svg'),
            'file_png'     =>$this->uploadPieceJointe($request->photo_png,$request->business_name,'png'),
            'status'       =>$request->status,
        ]);

        //Envoi du mail d'upload du formulaire
        Mail::to($request->email)
        ->send(new SubmissionMail($request->except('_token')));

        return response()->json([
            'error'=>false,
            'message'=>"Votre logo a été soumis avec succès.",
            'data'=>$data,
        ]);

    }

    public function testemail()
    {
        $data = [
            'nom' => 'Alhassane',
            'email' => 'alhassanesoro96@gmail.com',
            'message' => 'Je voulais vous dire que votre site est magnifique !'
        ];
        Mail::to("alhassanesoro96@gmail.com")
        ->send(new SubmissionMail($data));
    }
    public function uploadPieceJointe(Request $request, $categorie, $logo_type='png'){
        if(!is_file($request->logo_svg) || is_null($request->logo_png)) return null;
        $folder=Str::slug($categorie);
        $filename=Str::slug($request->business_name);
        $filename=$filename.'.'.$request->piece_jointe->extension();
        $path=$request->piece_jointe->move(storage_path('app/public/uploads/logos/'.$logo_type.'/'.$folder),$filename);

        return 'storage/logos/'.$logo_type.'/'.$folder.'/'.$filename;
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
