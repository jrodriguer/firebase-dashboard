import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { VersionInfo } from 'src/app/core/models/remote-config.model';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
	@Input() items?: Array<VersionInfo>;
	@Output() changePage = new EventEmitter<VersionInfo[]>(true);
	@Input() initialPage = 1;
	@Input() pageSize = 10;
	@Input() maxPages = 10;

	pager?: Pager;

	constructor() {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['items'].currentValue !== changes['items'].previousValue) {
			this.setPage(this.initialPage);
		}
	}

	setPage(page: number) {
		if (!this.items?.length) return;
		this.pager = this.paginate(this.items.length, page, this.pageSize, this.maxPages);
		const pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
		this.changePage.emit(pageOfItems);
	}

	paginate(
		totalItems: number,
		currentPage: number = 1,
		pageSize: number = 10,
		maxPages: number = 10
	): Pager {
		const totalPages = Math.ceil(totalItems / pageSize);

		// Ensure current page isn't out of range
		if (currentPage < 1) {
			currentPage = 1;
		} else if (currentPage > totalPages) {
			currentPage = totalPages;
		}

		let startPage: number, endPage: number;
		if (totalPages <= maxPages) {
			// total pages less than max so show all pages
			startPage = 1;
			endPage = totalPages;
		} else {
			// total pages more than max so calculate start and end pages
			const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
			const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
			if (currentPage <= maxPagesBeforeCurrentPage) {
				// current page near the start
				startPage = 1;
				endPage = maxPages;
			} else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
				// current page near the end
				startPage = totalPages - maxPages + 1;
				endPage = totalPages;
			} else {
				// current page somewhere in the middle
				startPage = currentPage - maxPagesBeforeCurrentPage;
				endPage = currentPage + maxPagesAfterCurrentPage;
			}
		}

		// calculate start and end item indexes
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

		// create an array of pages to ng-repeat in the pager control
		const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(i => startPage + i);

		return {
			totalItems,
			currentPage,
			pageSize,
			totalPages,
			startPage,
			endPage,
			startIndex,
			endIndex,
			pages,
		};
	}
}

export interface Pager {
	totalItems: number;
	currentPage: number;
	pageSize: number;
	totalPages: number;
	startPage: number;
	endPage: number;
	startIndex: number;
	endIndex: number;
	pages: number[];
}
