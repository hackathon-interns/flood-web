import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-access-denied',
  standalone: false,
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss'
})
export class AccessDeniedComponent {
  constructor(private confirmationService: ConfirmationService, private router: Router) {}

  ngOnInit(): void {
    this.confirmationService.confirm({
      message: 'Você precisa estar logado para acessar esta página. Deseja fazer login agora?',
      header: 'Acesso restrito',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.router.navigate(['/login']);
      },
      reject: () => {
        this.router.navigate(['/map']);
      }
    });
  }
}
