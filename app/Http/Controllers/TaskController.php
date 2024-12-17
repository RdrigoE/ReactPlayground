<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Auth::user()->tasks()->simplePaginate();

        return Inertia::render('Tasks/Index', ['tasks' => $tasks]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $attributes = $request->input();
        Log::info($attributes);

        $attributes = $request->validate(
            [
                'title'  => ['required', 'min:1', 'max:2048'],
                'status' => ['nullable'],
            ]
        );
        $task->update($attributes);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $todo)
    {
        //
    }
}
