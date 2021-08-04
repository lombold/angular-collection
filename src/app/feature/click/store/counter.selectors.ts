import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "@core/store/AppState";
import {CounterFeatureState} from "@feature/click/store/counter-feature-state";

export const featureKey = 'counterFeature';

export const selectFeature = createFeatureSelector<AppState, CounterFeatureState>(featureKey);
export const selectCounter = createSelector(selectFeature, (state: CounterFeatureState) => state.count);
