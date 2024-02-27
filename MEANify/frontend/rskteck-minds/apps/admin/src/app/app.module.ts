import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, ShellComponent, SidebarComponent, DashboardComponent],
    imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
