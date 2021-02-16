<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BusinessLogo;
class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['business_logo']=BusinessLogo::
        join('activity_areas','activity_areas.id','business_logos.activity_areas_id')
        ->select('business_logos.*','activity_areas.libelle as activity_area')
        ->orderBy('business_name')
        ->limit(30)
        ->get();
        return view('pages.accueil.index',$data);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function searchLogos(Request $request)
    {
        $limit = 32;
        empty($request->page) && $request->page=0;
        $data=BusinessLogo::
        join('activity_areas','activity_areas.id','business_logos.activity_areas_id')
        ->select('business_logos.*','activity_areas.libelle as activity_area')
        ->where('status', 'valide')
        ->where('business_name', 'like', '%'. $request->search . '%')
        ->orWhere('name', 'like', '%'. $request->search . '%')
        ->orWhere('activity_areas.libelle', 'like', '%'. $request->search . '%')
        ->orderBy('business_name')
        ->offset($request->page*$limit)
        ->limit($limit)
        ->get();
        // ->forPage($request->page, $limit);
        return response()->json([
            'error'=>false,
            'message'=>'Liste des logos recherchés.',
            'data'=>$data,
        ]);
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
        //
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