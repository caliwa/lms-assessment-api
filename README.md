<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## 📚 Acerca de este Proyecto: LMS Full-Stack

Este es un proyecto de evaluación Full-Stack que implementa un **Sistema de Gestión de Biblioteca (LMS)**.

El ecosistema está completamente containerizado usando **Laravel Sail** (Docker) y se divide en dos componentes principales:

1.  **Backend (API):** Una API RESTful robusta construida con **Laravel 11**. Se encarga de la lógica de negocio, autenticación (Sanctum), roles (Admin/User), y la gestión de la base de datos (MySQL).
2.  **Frontend (SPA):** Una Single Page Application moderna construida con **React 19 (Vite)**. Incluye un diseño "Fintech" (Tailwind CSS), enrutamiento (React Router), manejo de formularios (React Hook Form), y gestión de estado global (React Context).

El proyecto demuestra una arquitectura profesional separando la lógica de negocio en una capa de servicios en el backend, proveyendo un frontend reactivo y seguro.

---

## 🚀 Instalación y Ejecución

Este proyecto está diseñado para ejecutarse con **Laravel Sail**. El único prerrequisito es tener **Docker Desktop** instalado y corriendo.

### 1. Clonar y Configurar

Primero, clona el repositorio y navega al directorio.
```bash
git clone <tu-url-del-repositorio> lms-api
cd lms-api

# 1. Copia el archivo de entorno. (Sail leerá esto para configurarse)
cp .env.example .env

# 2. Levanta los contenedores (Laravel, MySQL, Redis, y el Frontend de React)
sail up -d

# 3. Instala las dependencias de PHP (Composer)
sail composer install

# 4. Genera la llave de la aplicación
sail artisan key:generate

# 5. Ejecuta las migraciones y llena la base de datos con datos de prueba (Admin/User)
sail artisan migrate:fresh --seed

POSTMAN APIS

{
	"info": {
		"_postman_id": "c1f2b3a4-d5e6-4a7b-8c9d-1e2f3a4b5c6d",
		"name": "LMS API (Sail) v2 - con Accept Header",
		"description": "Colección de Postman para el Sistema de Gestión de Biblioteca (LMS) API con Laravel Sail. Incluye 'Accept: application/json' en todas las peticiones.",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "🔑 Autenticación",
			"description": "Endpoints para login, logout y ver perfil.",
			"item": [
				{
					"name": "Login (Admin)",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"var jsonData = pm.response.json();",
									"if (jsonData && jsonData.token) {",
									"    pm.collectionVariables.set(\"token\", jsonData.token);",
									"    console.log('Admin Token guardado!');",
									"} else {",
									"    console.log('No se pudo encontrar el token en la respuesta.');",
									"}"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "email",
									"value": "admin@lms.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "admin123",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "{{baseUrl}}/api/login",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"login"
							]
						},
						"description": "Autentica al Admin y guarda el token en `{{token}}`."
					},
					"response": []
				},
				{
					"name": "Login (User)",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"var jsonData = pm.response.json();",
									"if (jsonData && jsonData.token) {",
									"    pm.collectionVariables.set(\"token\", jsonData.token);",
									"    console.log('User Token guardado!');",
									"} else {",
									"    console.log('No se pudo encontrar el token en la respuesta.');",
									"}"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "email",
									"value": "user@lms.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "user123",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "{{baseUrl}}/api/login",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"login"
							]
						},
						"description": "Autentica al Usuario y guarda el token en `{{token}}`."
					},
					"response": []
				},
				{
					"name": "Get Authenticated User (Me)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/api/me",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"me"
							]
						},
						"description": "Devuelve los datos del usuario autenticado actualmente."
					},
					"response": []
				},
				{
					"name": "Logout",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/api/logout",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"logout"
							]
						},
						"description": "Invalida el token de acceso actual."
					},
					"response": []
				}
			]
		},
		{
			"name": "📚 Libros (Público)",
			"description": "Endpoints públicos para ver y buscar libros.",
			"item": [
				{
					"name": "Listar Libros (Paginado)",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/api/books?page=1",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"books"
							],
							"query": [
								{
									"key": "page",
									"value": "1",
									"description": "(Opcional) Número de página."
								}
							]
						},
						"description": "Obtiene una lista paginada de libros."
					},
					"response": []
				},
				{
					"name": "Obtener un Libro",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/api/books/1",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"books",
								"1"
							]
						},
						"description": "Obtiene los detalles de un libro específico."
					},
					"response": []
				},
				{
					"name": "Buscar Libros",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/api/books/search?q=et",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"books",
								"search"
							],
							"query": [
								{
									"key": "q",
									"value": "et",
									"description": "Término de búsqueda (título, autor, ISBN)"
								}
							]
						},
						"description": "Busca libros. Devuelve el mismo formato paginado que Listar Libros."
					},
					"response": []
				}
			]
		},
		{
			"name": "🛍️ Préstamos (Usuario)",
			"description": "Operaciones de préstamo para usuarios autenticados (rol 'User').",
			"item": [
				{
					"name": "Pedir Prestado un Libro",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/api/books/1/borrow",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"books",
								"1",
								"borrow"
							]
						},
						"description": "Intenta prestar el Libro con ID=1. (Requiere token de 'User').\nFalla si el libro no está disponible o si el usuario ya tiene 3 libros."
					},
					"response": []
				},
				{
					"name": "Devolver un Libro",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/api/books/1/return",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"books",
								"1",
								"return"
							]
						},
						"description": "Devuelve el Libro con ID=1 que el usuario tiene prestado."
					},
					"response": []
				},
				{
					"name": "Ver Mis Libros Prestados",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/api/user/borrowed",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"user",
								"borrowed"
							]
						},
						"description": "Muestra los libros actualmente prestados por el usuario autenticado."
					},
					"response": []
				}
			]
		},
		{
			"name": "🔒 Admin: Gestión",
			"description": "Operaciones de CRUD para Admins.",
			"item": [
				{
					"name": "Gestión de Libros (Admin)",
					"item": [
						{
							"name": "Crear Libro",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{token}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "Accept",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "formdata",
									"formdata": [
										{
											"key": "title",
											"value": "Nuevo Libro de Postman",
											"type": "text"
										},
										{
											"key": "author_id",
											"value": "1",
											"type": "text"
										},
										{
											"key": "isbn",
											"value": "978-1234567890",
											"type": "text"
										},
										{
											"key": "publication_year",
											"value": "2025",
											"type": "text"
										}
									]
								},
								"url": {
									"raw": "{{baseUrl}}/api/books",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"api",
										"books"
									]
								},
								"description": "Crea un nuevo libro. (Requiere token de 'Admin')."
							},
							"response": []
						},
						{
							"name": "Actualizar Libro",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{token}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "Accept",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "formdata",
									"formdata": [
										{
											"key": "_method",
											"value": "PUT",
											"type": "text"
										},
										{
											"key": "title",
											"value": "Título del Libro Actualizado",
											"type": "text"
										}
									]
								},
								"url": {
									"raw": "{{baseUrl}}/api/books/1",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"api",
										"books",
										"1"
									]
								},
								"description": "Actualiza un libro. (Requiere token de 'Admin').\n\n**Nota:** Usa POST con un campo `_method: PUT` para compatibilidad con form-data."
							},
							"response": []
						},
						{
							"name": "Eliminar Libro",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{token}}",
											"type": "string"
										}
									]
								},
								"method": "DELETE",
								"header": [
									{
										"key": "Accept",
										"value": "application/json"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/api/books/1",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"api",
										"books",
										"1"
									]
								},
								"description": "Elimina un libro. (Requiere token de 'Admin')."
							},
							"response": []
						}
					]
				},
				{
					"name": "Gestión de Usuarios (Admin)",
					"item": [
						{
							"name": "Listar Usuarios",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{token}}",
											"type": "string"
										}
									]
								},
								"method": "GET",
								"header": [
									{
										"key": "Accept",
										"value": "application/json"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/api/users",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"api",
										"users"
									]
								},
								"description": "Obtiene la lista de todos los usuarios. (Requiere token de 'Admin')."
							},
							"response": []
						},
						{
							"name": "Crear Usuario",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{token}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "Accept",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "formdata",
									"formdata": [
										{
											"key": "name",
											"value": "Usuario Creado por Admin",
											"type": "text"
										},
										{
											"key": "email",
											"value": "nuevo.usuario@example.com",
											"type": "text"
										},
										{
											"key": "password",
											"value": "password",
											"type": "text"
										},
										{
											"key": "password_confirmation",
											"value": "password",
											"type": "text"
										},
										{
											"key": "unique_library_id",
											"value": "U123456",
											"type": "text"
										},
										{
											"key": "role",
											"value": "User",
											"type": "text"
										}
									]
								},
								"url": {
									"raw": "{{baseUrl}}/api/users",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"api",
										"users"
									]
								},
								"description": "Crea un nuevo usuario (User o Admin). (Requiere token de 'Admin')."
							},
							"response": []
						},
						{
							"name": "Actualizar Usuario",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{token}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "Accept",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "formdata",
									"formdata": [
										{
											"key": "_method",
											"value": "PUT",
											"type": "text"
										},
										{
											"key": "name",
											"value": "Nombre de Usuario Editado",
											"type": "text"
										},
										{
											"key": "role",
											"value": "Admin",
											"type": "text"
										}
									]
								},
								"url": {
									"raw": "{{baseUrl}}/api/users/2",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"api",
										"users",
										"2"
									]
								},
								"description": "Actualiza un usuario (ej: ID 2, el 'Test User'). (Requiere token de 'Admin').\n\n**Nota:** Usa POST con un campo `_method: PUT`."
							},
							"response": []
						}
					]
				}
			]
		}
	],
	"variable": [
		{
			"key": "baseUrl",
			"value": "http://localhost",
			"description": "URL base de la API. (localhost para Sail)"
		},
		{
			"key": "token",
			"value": "",
			"description": "Token de autenticación (se llena automáticamente al hacer Login)."
		}
	]
}