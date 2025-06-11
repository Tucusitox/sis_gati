<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TypeAsset
 * 
 * @property int $id_typeAsset
 * @property string $typeAsset_name
 * 
 * @property Collection|Asset[] $assets
 *
 * @package App\Models
 */
class TypeAsset extends Model
{
	protected $table = 'type_assets';
	protected $primaryKey = 'id_typeAsset';
	public $timestamps = false;

	protected $fillable = [
		'typeAsset_name'
	];

	public function assets()
	{
		return $this->hasMany(Asset::class, 'fk_typeAsset');
	}
}
