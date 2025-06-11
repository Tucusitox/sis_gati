<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EmployeesXAsset
 * 
 * @property int $id_employeeXasset
 * @property int $fk_employee
 * @property int $fk_asset
 * @property Carbon $date_assignment
 * 
 * @property Asset $asset
 * @property Employee $employee
 *
 * @package App\Models
 */
class EmployeesXAsset extends Model
{
	protected $table = 'employees_x_assets';
	protected $primaryKey = 'id_employeeXasset';
	public $timestamps = false;

	protected $casts = [
		'fk_employee' => 'int',
		'fk_asset' => 'int',
		'date_assignment' => 'datetime'
	];

	protected $fillable = [
		'fk_employee',
		'fk_asset',
		'date_assignment'
	];

	public function asset()
	{
		return $this->belongsTo(Asset::class, 'fk_asset');
	}

	public function employee()
	{
		return $this->belongsTo(Employee::class, 'fk_employee');
	}
}
