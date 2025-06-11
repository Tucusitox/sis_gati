<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->integer('id_asset', true);
            $table->integer('fk_typeAsset')->index('fk_assets_type_assets1_idx');
            $table->integer('fk_location')->index('fk_assets_locations1_idx');
            $table->string('asset_serial', 200)->unique('asset_serial_unique');
            $table->string('asset_model', 200);
            $table->string('asset_mark', 200);
            $table->date('asset_dateRegister');
            $table->string('asset_status', 100);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
