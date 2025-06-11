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
        Schema::table('assets', function (Blueprint $table) {
            $table->foreign(['fk_location'], 'fk_assets_locations1')->references(['id_location'])->on('locations')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['fk_typeAsset'], 'fk_assets_type_assets1')->references(['id_typeAsset'])->on('type_assets')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assets', function (Blueprint $table) {
            $table->dropForeign('fk_assets_locations1');
            $table->dropForeign('fk_assets_type_assets1');
        });
    }
};
