<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Employee
 * 
 * @property int $id_employee
 * @property int $fk_location
 * @property string $employee_userName
 * @property string $employee_name
 * @property string $employee_lastName
 * 
 * @property Location $location
 * @property Collection|Asset[] $assets
 *
 * @package App\Models
 */
class Employee extends Model
{
	protected $table = 'employees';
	protected $primaryKey = 'id_employee';
	public $timestamps = false;

	protected $casts = [
		'fk_location' => 'int'
	];

	protected $fillable = [
		'fk_location',
		'employee_userName',
		'employee_name',
		'employee_lastName'
	];

	public function location()
	{
		return $this->belongsTo(Location::class, 'fk_location');
	}

	public function assets()
	{
		return $this->belongsToMany(Asset::class, 'employees_x_assets', 'fk_employee', 'fk_asset')
					->withPivot('id_employeeXasset', 'date_assignment');
	}
}
