<?php

namespace App\Http\Controllers;

use App\Mail\SubmissionMail;
use App\Models\ActivityArea;
use App\Models\BusinessLogo;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class SubmitLogosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['activity_areas'] = ActivityArea::orderBy('libelle','asc')->get();
        return view('pages.soumission.index',$data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),
            [
                'name'  =>'required|string',
                'email'  =>'required|email',
                'business_name'  =>'required|string|unique:business_logos,business_name',
                'activity_areas_id'  =>'required|integer|exists:activity_areas,id',
                'logo_svg'  =>'required|file|mimes:svg',
                'logo_png'  =>'required|file|mimes:png'
            ],
            [
                'name.*'  =>"Veuillez saisir votre nom",
                'email.*'  =>"L'adresse email saise est invalide",
                'business_name.required'  =>"Veuillez saisir un nom valide",
                'business_name.string'  =>"Veuillez saisir un nom valide",
                'business_name.unique'  =>"Ce nom existe déjà",
                'activity_areas_id.*'  =>"Veuillez choisir le secteur d'activité svp",
                'logo_svg.*'  =>"Veuillez télécharger un fichier au format svg",
                'logo_png.*'  =>"Veuillez télécharger un fichier au format png"
            ]
        );

        if($validator->fails()) return $this->sendError($validator->errors()->messages(), null);
        $request['activity_areas']=ActivityArea::find($request->activity_areas_id)->slug;
        BusinessLogo::create([
            'name'              =>$request->name,
            'email'             =>$request->email,
            'business_name'     =>$request->business_name,
            'activity_areas_id' =>$request->activity_areas_id,
            'logo_png'          =>$this->uploadPNGLogo($request),
            'logo_svg'          =>$this->uploadSVGLogo($request),
            'status'            =>'soumis',
        ]);

        // Sending Email
        // Mail::to($request->email)
        // ->send(new SubmissionMail($request->except('_token')));

        return response()->json(['message'=>"Votre logo a été soumis avec succès."],200);
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

    public function uploadPNGLogo(Request $request){
        if(!is_file($request->logo_png) || is_null($request->logo_png)) return null;
        $folder=$request->activity_areas;
        $filename=Str::slug($request->business_name);
        $filename=$filename.'.'.$request->logo_png->extension();
        $path=$request->logo_png->move(storage_path('app/public/uploads/logos/png/'.$folder),$filename);
        return 'storage/uploads/logos/png/'.$folder.'/'.$filename;
    }

    public function uploadSVGLogo(Request $request){
        if(!is_file($request->logo_svg) || is_null($request->logo_svg)) return null;
        $folder=$request->activity_areas;
        $filename=Str::slug($request->business_name);
        $filename=$filename.'.'.$request->logo_svg->extension();
        $path=$request->logo_svg->move(storage_path('app/public/uploads/logos/svg/'.$folder),$filename);
        return 'storage/uploads/logos/svg/'.$folder.'/'.$filename;
    }

}
