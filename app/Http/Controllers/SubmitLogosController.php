<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class SubmitLogosController extends Controller
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
                'name'  =>'required|string',
                'email'  =>'required|email',
                'business_name'  =>'required|string',
                'photo_svg'  =>'required|file|mimes:svg',
                'photo_png'  =>'required|file|mimes:png'
            ],
            [
                'name.*'  =>"Veuillez saisir le nom svp",
                'email.*'  =>"Veuillez saisir une adresse email valide",
                'business_name.*'  =>"Veuillez saisir une adresse email valide",
                'photo_svg.*'  =>"Veuillez uploadé un fichier au format svg",
                'photo_png.*'  =>"Veuillez uploadé un fichier au format png"
            ]
        );

        if($validator->fails()) return $this->sendError($this->arrayToChaine($validator->errors()->messages()), null);
        $categorie = Categorie::find($request->$categories_id);
        BuisnessLogo::create([
            'name'          =>$request->name,
            'email'         =>$request->email,
            'business_name' =>$request->business_name,
            'photo_svg'     =>$this->uploadPieceJointe($request->photo_svg,$categorie->libelle),
            'photo_png'     =>$this->uploadPieceJointe($request->photo_png,$categorie->libelle,'svg'),
        ]);

        return response()->json([
            'error'=>false,
            'message'=>"",
            'data'=>[],
        ])
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
