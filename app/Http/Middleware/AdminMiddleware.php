<?php

namespace App\Http\Middleware;

// No necesitamos importar el Enum aquí si usamos el helper
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'No autenticado.'], 401);
        }

        $rawRole = auth()->user()->getRawOriginal('role');

        if ($rawRole !== 'Admin') {
            return response()->json([
                'message' => 'Acceso denegado. Requiere rol de administrador.',
                'debug_role' => $rawRole
            ], 403);
        }

        return $next($request);
    }
}