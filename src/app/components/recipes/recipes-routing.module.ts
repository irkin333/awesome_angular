import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from '../../services/recipes-resolver.service';
import { AuthGuard } from '../../auth/auth-guards';

const RecipesRoutes: Routes = [
  {
    path: '', component: RecipesComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(RecipesRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
