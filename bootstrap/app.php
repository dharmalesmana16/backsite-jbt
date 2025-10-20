<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            // checkAuth::class
        ]);
        $middleware->alias([
            'checkAuth' => \App\Http\Middleware\checkAuth::class,
            'redirectIfAuth' => \App\Http\Middleware\redirectIfAuth::class,
        ]);
        $middleware->validateCsrfTokens([
            '/api/*',
            '/signin',
            '/login',
            '/logout'
        ]);
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
