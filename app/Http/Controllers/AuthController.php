<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {

            $username = $request->username;
            $password = $request->password;
            $userData = User::where("username", $username)->first();

            // if (! Hash::check($password, $userData->password)) {
            //     return response()->json([
            //         "code"   => 0,
            //         "status" => "Login Gagal",
            //         "msg"    => "Username atau password salah !",
            //     ], 400);
            // }
            if (Auth::attempt(['username' => $username, 'password' => $password])) {
                $generateToken = $userData->createToken($username)->plainTextToken;
                return response()->json([
                    "code"   => 10,
                    "status" => 200,
                    "msg"    => "Login Berhasils",
                    "token"  => $generateToken,
                    "username" => $username,
                    "token_id" => Auth::user()->tokens->where("tokenable_id", $userData->id)->first(),
                    // "token_id" => Auth::user(),
                ], 201);
            }
            return response()->json([
                "code"   => 0,
                "status" => "Login Gagal",
                "msg"    => "Username atau password salahs !",
            ], 404);
        } catch (\Exception $e) {
            // if (Auth::attempt(['username' => $username, 'password' => $password])) {
            //     $generateToken = $userData->createToken($username)->plainTextToken;
            //     return response()->json([
            //         "code"   => 1,
            //         "status" => 201,
            //         "msg"    => "Login Berhasil",
            //         "token"  => $generateToken,
            //     ], 201);
            // }
            return response()->json([
                "code"   => 0,
                "status" => "Login Gagal",
                "msg"    => "Username atau password salahs !",
            ], 404);
        }
    }
    public function pageLogin()
    {
        return Inertia::render('Auth/Login');
    }
    public function pageRegister()
    {
        return Inertia::render('Auth/Register');
    }
    public function signup(Request $request)
    {
        try {
            $data     = new User();
            $username = $request->username;
            $password = $request->password;
            $register = $data::create([
                // 'name' => "dalsfindo",
                'username' => $username,
                'password' => Hash::make($password),
            ]);
            if ($register) {
                return response()->json([
                    "code"   => 1,
                    "msg" => "Buat Akun Berhasil",
                ], 201);
            } else {
                return response()->json([
                    "code"   => 0,
                    "msg" => "Gagal Buat Akun",
                ], 201);
            }
        } catch (\Exception $e) {
            return response()->json([
                "code"   => 0,
                "status" => "Login Gagal",
                "msg"    => $e->getMessage(),
            ], 404);
        }
    }
    public function logout(Request $request)
    {
        Auth::user()->tokens()->delete();
        Auth::logout();
        // return response()->json([
        //     "msg" => "logged out"
        // ]);
        // // }
        return redirect('/signin');
    }
}
