<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){
        try{


        $username = $request->username;
        $password = $request->password;
        $userData = User::where("username",$username)->first();

        if(!Hash::check($password,$userData->password)){
            return response()->json([
                "code" =>0,
                "status" => "Login Gagal",
                "msg" => "Username atau password salah !"
            ],400);
        }
        $generateToken = $userData->createToken($username)->plainTextToken;
        return response()->json([
            "code" =>1,
            "status" => "Login Berhasil",
            "msg" => $userData,
            "token" => $generateToken
        ],201); }
        catch(\Exception $e){
             return response()->json([
                "code" =>0,
                "status" => "Login Gagal",
                "msg" => "Username atau password salah !"
            ],404);
        }
    }
   public function logout()
    {
        // auth()->logout();
        // Auth()::logout();
        // return response()->json([
        //     'success'    => true
        // ], 200);
    }
}
