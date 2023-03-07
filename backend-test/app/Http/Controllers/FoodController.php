<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $foods = Food::all()->map(function ($food) {
            $food->foto = $food->foto ? asset($food->foto) : null;
            return $food;
        });
        return response()->json($foods);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama' => 'required',
            'harga' => 'required|integer',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('foto')) {
            $foto = $request->file('foto')->store('public/food');
            $validatedData['foto'] = $foto;
        }

        $foods = Food::create($validatedData);

        return response()->json([
            'success' => true,
            'data' => $foods
        ]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Food  $food
     * @return \Illuminate\Http\Response
     */
    public function show(Food $food)
    {
        if (!$food) {
            return response()->json([
                'success' => false,
                'message' => 'Food not found'
            ], 404);
        }

        $food->foto = $food->foto ? asset($food->foto) : null;

        return response()->json([
            'success' => true,
            'data' => $food
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Food  $food
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Food $food)
    {
        $validatedData = $request->validate([
            'nama' => 'required',
            'harga' => 'required|integer'
        ]);

        $food = Food::findOrFail($food->id);

        $food->update($validatedData);

        $food->foto = $food->foto ? asset($food->foto) : null;

        return response()->json([
            'success' => true,
            'data' => $food
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Food  $food
     * @return \Illuminate\Http\Response
     */
    public function destroy(Food $food)
    {
        $food = Food::findOrFail($food->id);
        $food->delete();

        return response()->json([
            'success' => true,
            'message' => 'Food deleted successfully'
        ]);
    }
}
