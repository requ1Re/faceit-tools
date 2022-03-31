import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StatsEffects } from './stats/stats.effects';

import { statsReducer } from './stats/stats.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('stats', statsReducer),
    EffectsModule.forFeature([StatsEffects]),
  ],
  exports: [],
  providers: [],
})
export class AppStoreModule {}
