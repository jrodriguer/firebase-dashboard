import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
	@Output() collapsedEvent = new EventEmitter<boolean>();
	isActive = false;
	collapsed = false;
	showMenu = '';
	pushRightClass = '';

	constructor(public router: Router) {
		this.router.events.subscribe(val => {
			if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
				this.toggleSidebar();
			}
		});
	}

	ngOnInit() {
		this.isActive = false;
		this.collapsed = false;
		this.showMenu = '';
		this.pushRightClass = 'push-right';
	}

	eventCalled() {
		this.isActive = !this.isActive;
	}

	addExpandClass(element: string) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}

	toggleCollapsed() {
		this.collapsed = !this.collapsed;
		this.collapsedEvent.emit(this.collapsed);
	}

	isToggled(): boolean {
		const dom: any = document.querySelector('body');
		return dom.classList.contains(this.pushRightClass);
	}

	toggleSidebar() {
		const dom: any = document.querySelector('body');
		dom.classList.toggle(this.pushRightClass);
	}

	rltAndLtr() {
		const dom: any = document.querySelector('body');
		dom.classList.toggle('rtl');
	}

	changeLang(language: string) {
		// this.translate.use(language);
	}

	onLoggedout() {
		localStorage.removeItem('isLoggedin');
	}
}
