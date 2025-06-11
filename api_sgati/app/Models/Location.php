<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Location
 * 
 * @property int $id_location
 * @property string $city
 * @property string $sede
 * @property string $store
 * 
 * @property Collection|Asset[] $assets
 * @property Collection|Employee[] $employees
 *
 * @package App\Models
 */
class Location extends Model
{
	protected $table = 'locations';
	protected $primaryKey = 'id_location';
	public $timestamps = false;

	protected $fillable = [
		'city',
		'sede',
		'store'
	];

	public function assets()
	{
		return $this->hasMany(Asset::class, 'fk_location');
	}

	public function employees()
	{
		return $this->hasMany(Employee::class, 'fk_location');
	}
}
