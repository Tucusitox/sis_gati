<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Asset
 * 
 * @property int $id_asset
 * @property int $fk_typeAsset
 * @property int $fk_location
 * @property string $asset_serial
 * @property string $asset_model
 * @property string $asset_mark
 * @property Carbon $asset_dateRegister
 * @property string $asset_status
 * 
 * @property Location $location
 * @property TypeAsset $type_asset
 * @property Collection|Employee[] $employees
 *
 * @package App\Models
 */
class Asset extends Model
{
	protected $table = 'assets';
	protected $primaryKey = 'id_asset';
	public $timestamps = false;

	protected $casts = [
		'fk_typeAsset' => 'int',
		'fk_location' => 'int',
		'asset_dateRegister' => 'date:Y-m-d'
	];

	protected $fillable = [
		'fk_typeAsset',
		'fk_location',
		'asset_serial',
		'asset_model',
		'asset_mark',
		'asset_dateRegister',
		'asset_status'
	];

	public function location()
	{
		return $this->belongsTo(Location::class, 'fk_location');
	}

	public function type_asset()
	{
		return $this->belongsTo(TypeAsset::class, 'fk_typeAsset');
	}

	public function employees()
	{
		return $this->belongsToMany(Employee::class, 'employees_x_assets', 'fk_asset', 'fk_employee')
					->withPivot('id_employeeXasset', 'date_assignment');
	}
}
