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
        Schema::table('employees_x_assets', function (Blueprint $table) {
            $table->foreign(['fk_asset'], 'fk_users_has_assets_assets1')->references(['id_asset'])->on('assets')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['fk_employee'], 'fk_users_x_assets_employees1')->references(['id_employee'])->on('employees')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees_x_assets', function (Blueprint $table) {
            $table->dropForeign('fk_users_has_assets_assets1');
            $table->dropForeign('fk_users_x_assets_employees1');
        });
    }
};
