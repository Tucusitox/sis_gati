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
        Schema::create('employees_x_assets', function (Blueprint $table) {
            $table->integer('id_employeeXasset', true);
            $table->integer('fk_employee')->index('fk_users_x_assets_employees1_idx');
            $table->integer('fk_asset')->index('fk_users_has_assets_assets1_idx');
            $table->date('date_assignment');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees_x_assets');
    }
};
