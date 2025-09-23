<?php

use App\Http\Controllers\Api\DireksiController;
use App\Http\Controllers\Api\Prestasi;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Models\Berita;
use App\Models\Direksi;
use App\Models\InformasiPerusahaan;
use App\Models\Prestasi as ModelsPrestasi;
use App\Models\Saham;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $dataPerusahaan = new InformasiPerusahaan();
    $data = [
        "dataPerusahaan" => $dataPerusahaan::where("id", "=", "1")->first()
    ];
    return Inertia::render('Dashboard', $data);
});
Route::get('/tarif', function () {
    return Inertia::render('Tarif/Page');
});
Route::get('/tarif/create', function () {
    return Inertia::render('Tarif/Create');
});

Route::get('/report', function () {
    return Inertia::render('Report/Page');
});
Route::get('/report/create', function () {
    return Inertia::render('Report/Create');
});
Route::get('/berita', function () {
    return Inertia::render('Berita/Page');
});
Route::get('/berita/create', function () {
    return Inertia::render('Berita/Create');
});

Route::prefix("direksi")->group(function () {
    Route::get('/', function () {
        return Inertia::render('Direksi/Page');
    });
    Route::get('/create', function () {
        return Inertia::render('Direksi/Create');
    });
    Route::get('/update/{slug}', function ($slug) {
        $model = new Direksi();
        $data = $model::where("slug", "=", $slug)->first();
        return Inertia::render('Direksi/Update', ['slug' => $data]);
    });
});
Route::prefix("prestasi")->group(function () {
    Route::get('/create', function () {
        return Inertia::render('Prestasi/Create');
    });
    Route::get('/', function () {
        return Inertia::render('Prestasi/Page');
    });
    Route::get('/update/{slug}', function ($slug) {
        $model = new ModelsPrestasi();
        $data = $model::where("slug", "=", $slug)->first();
        return Inertia::render('Prestasi/Update', ['slug' => $data]);
    });
});
Route::prefix("sejarah")->group(function () {
    Route::get('/create', function () {
        return Inertia::render('Sejarah/Create');
    });
    Route::get('/', function () {
        return Inertia::render('Sejarah/Page');
    });
    Route::get('/update/{slug}', function ($slug) {
        $model = new ModelsPrestasi();
        $data = $model::where("slug", "=", $slug)->first();
        return Inertia::render('Sejarah/Update', ['slug' => $data]);
    });
});
Route::prefix("pemegangsaham")->group(function () {
    Route::get('/create', function () {
        return Inertia::render('Saham/Create');
    });
    Route::get('/', function () {
        return Inertia::render('Saham/Page');
    });
    Route::get('/update/{slug}', function ($slug) {
        $model = new Saham();
        $data = $model::where("slug", "=", $slug)->first();
        return Inertia::render('Saham/Update', ['slug' => $data]);
    });
});
Route::prefix("berita")->group(function () {
    Route::get('/create', function () {
        return Inertia::render('Berita/Create');
    });
    Route::get('/', function () {
        return Inertia::render('Berita/Page');
    });
    Route::get('/update/{slug}', function ($slug) {
        $model = new Berita();
        $data = $model::where("slug", "=", $slug)->first();
        return Inertia::render('Berita/Update', ['slug' => $data]);
    });
});
Route::prefix("staticcontent")->group(function () {
    Route::get('/create', function () {
        return Inertia::render('static_content/Create');
    });
    Route::get('/', function () {
        return Inertia::render('static_content/Page');
    });
    Route::get('/update/{slug}', function ($slug) {
        $model = new Berita();
        $data = $model::where("slug", "=", $slug)->first();
        return Inertia::render('static_content/Update', ['slug' => $data]);
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
// Route::post( 'register', [AuthController::class, 'register']);
Route::get('signup', action: [AuthController::class, 'pageRegister']);
Route::post('signup', [AuthController::class, 'signup']);
Route::get('signin', action: [AuthController::class, 'pageLogin']);
Route::post('signin', action: [AuthController::class, 'login']);

// require __DIR__.'/auth.php';
