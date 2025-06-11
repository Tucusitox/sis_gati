<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Class User
 * 
 * @property int $user_id
 * @property int $fk_rol
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $status
 * 
 * @property Rol $rol
 *
 * @package App\Models
 */
class User extends Authenticatable
{	
	use HasApiTokens;
	
	protected $table = 'users';
	protected $primaryKey = 'user_id';
	public $timestamps = false;

	protected $casts = [
		'fk_rol' => 'int'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'fk_rol',
		'name',
		'email',
		'password',
		'status'
	];

	public function rol()
	{
		return $this->belongsTo(Rol::class, 'fk_rol');
	}
}
