<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $transactions = Transaction::with('food')->get();
        return response()->json($transactions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $transactions = $request->all();
        $transactionData = [];

        foreach ($transactions as $transaction) {
            $food = Food::find($transaction['food_id']);

            if (!$food) {
                return response()->json([
                    'success' => false,
                    'message' => 'Food not found'
                ], 404);
            }

            $totalPrice = $food->harga * $transaction['quantity'];
            $transactionData[] = [
                'food_id' => $food->id,
                'quantity' => $transaction['quantity'],
                'total_price' => $totalPrice,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        $transaction = Transaction::insert($transactionData);

        return response()->json([
            'success' => true,
            'data' => $transaction
        ]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction)
    {
        //
        $transaction = Transaction::with('food')->find($transaction->food_id);
        if (!$transaction) {
            return response()->json([
                'success' => false,
                'message' => 'Transaction not found'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $transaction
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
        $food = Food::find($request->food_id);
        if (!$food) {
            return response()->json([
                'success' => false,
                'message' => 'Food not found'
            ], 404);
        }

        $transaction->food_id = $food->id;
        $transaction->quantity = $request->quantity;
        $transaction->total_price = $food->harga * $request->quantity;
        $transaction->save();

        return response()->json([
            'success' => true,
            'data' => $transaction
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        //
        $transaction->delete();
        return response()->json([
            'success' => true,
            'message' => 'Transaction deleted successfully'
        ]);
    }
}
