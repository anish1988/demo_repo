<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use View;
use Form;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Session;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    //
    
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		// get all the nerds
		//$user = User::all();
		$user = User::orderBy('created_at','DESC')->get();
		// load the view and pass the nerds
		return View::make('welcome')
		->with('users', $user);
	}
	
	
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		// get the nerd
		$user = User::find($id);
	
		// show the view and pass the nerd to it
		return View::make('user.show')
		->with('user', $user);
	}
	
	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		// get the nerd
		$user = User::find($id);
	
		// show the edit form and pass the nerd
		return View::make('user.edit')
		->with('user', $user);
	}
	
	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		// validate
		// read more on validation at http://laravel.com/docs/validation
		$rules = array(
				'name' => 'required|max:255',
                'email' => 'required|email|max:255|unique:users',
				
		);
		$validator = Validator::make(Input::all(), $rules);
	
		// process the login
		if ($validator->fails()) {
			return Redirect::to('users/' . $id . '/edit')
			->withErrors($validator)
			->withInput(Input::except('password'));
		} else {
			// store
			$user = User::find($id);
			$user->name       = Input::get('name');
			$user->email      = Input::get('email');
			
			$user->save();
	
			// redirect
			Session::flash('message', 'Successfully updated user!');
			return Redirect::to('/');
		}
	}
	
	
	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		// delete
		$user = User::find($id);
		$user->delete();
	
		// redirect
		Session::flash('message', 'Successfully deleted the User!');
		return Redirect::to('/');
	}
	
	
}
