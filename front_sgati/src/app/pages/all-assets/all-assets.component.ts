import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssetsService } from '../../services/assets.service';
import { GetAssets } from '../../models/Assets';
import { AssetsTableComponent } from '../../components/assetsComponents/assets-table/assets-table.component';

@Component({
  selector: 'app-all-assets',
  imports: [CommonModule, AssetsTableComponent,FormsModule],
  templateUrl: './all-assets.component.html',
})

export class AllAssetsComponent implements OnInit {
  protected assetsService = inject(AssetsService);
  protected typeTabla: string = 'activos';
  protected tableItems: GetAssets[] = [];
  protected tipoActivo:string = '';
  protected locationAsset:any[] = [];
  protected typeAssets:any[] = [];

  ngOnInit(): void {
    this.getAssets();
    this.getAssetUpdateLocation();
    this.getTypeAssetUpdate();
  }

  getAssets(){
    this.assetsService.getAllAssets().subscribe({
      next: (resp:GetAssets[]) => {
        this.tableItems = resp;
        //console.log(this.tableItems)
      },
      error: (err) => {
        if (err.status == 404 ) {
          console.log('Error Inesperado');
        }
      }
    });
  };

  getTypeAssetUpdate(){
    this.assetsService.getAllTypeAssetsUpdate().subscribe({
      next: (resp:any[]) => {
        this.typeAssets = resp;
      },
      error: (err) => {
        if (err.status == 404 ) {
          console.log('Error Inesperado');
        }
      }
    });
  };

  getAssetUpdateLocation(){
    this.assetsService.getAllEditAssetsLocations().subscribe({
      next: (resp:any[]) => {
        this.locationAsset = resp;
      },
      error: (err) => {
        if (err.status == 404 ) {
          console.log('Error Inesperado');
        }
      }
    });
  };
  
}