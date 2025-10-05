<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{

    public function login(Request $request)
    {

   try {

            $username = $request->username;
            $password = $request->password;
            $userData = User::where("username", $username)->first();

            if (! Hash::check($password, $userData->password)) {
                return response()->json([
                    "code"   => 0,
                    "status" => "Login Gagal",
                    "msg"    => "Username atau password salah !",
                ], 400);
            }
            $generateToken = $userData->createToken($username)->plainTextToken;
             session([
                    'nama' => $userData->username,
                    'user_id' => $userData->id,
                    'isLogin' => true,
                    // 'role' => $checkAuth->role,
                ]);
            return response()->json([
                "code"   => 1,
                "status" => 201,
                "msg"    => "Login Berhasil",
                "token"  => $generateToken,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "code"   => 0,
                "status" => "Login Gagal",
                "msg"    => "Username atau password salah !",
            ], 404);
        }


    }
    public function pageLogin(){
            return Inertia::render('Auth/Login');

    }
    public function pageRegister(){
            return Inertia::render('Auth/Register');

    }
    public function signup(Request $request)
    {
        try {
            $data     = new User();
            $username = $request->username;
            $password = $request->password;
            $register = $data::create([
                'name'=>"dalsfindo",
                'username' => $username,
                'password' => Hash::make($password),
            ]);
            if($register){
                return response()->json([
                    "code"   => 1,
                    "msg" => "Buat Akun Berhasil",
                ], 201);
            }else{
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
        // Artisan::call('cache:clear');
        $request->session()->flush(); // session_unset();
        // Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect(url('/signin'));
    }
}
